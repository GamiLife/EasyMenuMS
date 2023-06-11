import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY, JWT_HANDLER, USER_REPOSITORY } from 'src/core/constants';
import { DBError, EmptyError } from 'src/core/exceptions';
import { HeaderAuthenticator } from 'src/core/helpers';
import { UsersService } from '../users/users.service';
import { UserDomainV2 } from '../users/users.domain';
import { FirebaseTokenValidator } from 'src/core/firebase';
import { UserEntity } from '../users/users.entity';
import { UserTypeEntity } from '../user-types/user-type.entity';
import { CompanyEntity } from '../companies/company.entity';
import { Op } from 'sequelize';
import { plainToClass } from '@nestjs/class-transformer';
import { AuthEntity } from './auth.entity';
import { JwtHandler } from 'src/core/helpers/jwt.helper';
import { AuthCreateDto, AuthResponseDto } from './auth.dto';
import { Model } from 'sequelize-typescript';
import { IJwtTokens } from 'src/core/interfaces';


@Injectable()
export class AuthService extends HeaderAuthenticator<EmptyError> {
	constructor(
		@Inject(AUTH_REPOSITORY)
		private readonly authRepository: typeof AuthEntity,
		@Inject(USER_REPOSITORY)
		private readonly userRepository: typeof UserEntity,
		private readonly userService: UsersService,
		@Inject(JWT_HANDLER)
		private jwtHandler: JwtHandler
		
	){
		super(EmptyError)
	}
		
	async create(auth: AuthCreateDto): Promise<any> {

		const authEntity = await this.authRepository
			.create<AuthEntity>(auth)
			.catch((reason) => {
				throw new DBError(
					`User query failed: ${reason}`,
					HttpStatus.BAD_REQUEST
				);
			});

		if (!authEntity) {
			throw new DBError('User query failed', HttpStatus.BAD_REQUEST);
		}
	}

	async getJwtTokens(sub: string, email: string, id: number): Promise<IJwtTokens> {

		const { hashToken, ...tokens} = await this.jwtHandler.getJwtTokens(sub, email);
		
		const authDomain: AuthCreateDto = {
			userId: id,
			key: tokens.token,
			refreshKey: hashToken,
			expiry: tokens.expiry
		};

		this.create(authDomain);

		return tokens;
	}
			
	async findOneByIdToken(firebaseToken: string): Promise<UserDomainV2> {

		await this.authRepository.destroy<AuthEntity>({
			where: {
				 expiry: {
					[Op.lt]: new Date()
				 }
			}
		})
		
		const { sub, email, email_verified, name, displayName, phone_number } = await FirebaseTokenValidator(firebaseToken);
		
		if (!email_verified) {
			throw new EmptyError("Email not verified", HttpStatus.FORBIDDEN)
		}
		
		const userGetSubEntity = await this.userRepository.findOne<UserEntity>({
			where: {
				[Op.or]: [
					{ email }, 
					{
						email,
						sub
					}
				]
			},
			include: [
				{
					model: UserTypeEntity,
				},
				{
					model: CompanyEntity,
				},
			],
		});
		
		if (!userGetSubEntity) {	
			const [ names, last_name ] = name?.split(" ") ?? displayName?.split(" ");
			
			await this.userService.create({
				names,
				lastnames: last_name ?? "",
				email,
				phone: phone_number ?? "",
				userTypeId: 1,
				companyId: 1,
				sub
			});

			return this.findOneByIdToken(firebaseToken);
		}
		
		// verify if user has the same sub, can´t have two accounts with the same email
		if (userGetSubEntity.sub !== sub) {
			throw new EmptyError("Email already registered", HttpStatus.CONFLICT);
		}
		
		let userDomain = plainToClass(UserDomainV2, userGetSubEntity, {
			excludeExtraneousValues: true,
			enableImplicitConversion: true,
		});
		
		
		const tokens = await this.getJwtTokens(userGetSubEntity.sub, userGetSubEntity.email, userGetSubEntity.id);
		
		return {
			...userDomain,
			...tokens
		};
		
	}
	
	async updateToken(key: string, refreshKey: string): Promise<IJwtTokens> {

		const authGetEntity = await this.authRepository.findOne<AuthEntity>({
			where: {
				key
			},
			include: [
				{
					model: UserEntity,
				}
			]
		});
		
		if (!authGetEntity) {
			throw new EmptyError("Unable to found token", HttpStatus.UNAUTHORIZED)
		}

		const isMatch = await this.jwtHandler.verifyHashKey(
			authGetEntity.refreshKey ?? "",
			refreshKey
		)

		if (!isMatch) {
			throw new EmptyError("Token-Id malformed", HttpStatus.FORBIDDEN)
		}

		const { sub } = await this.jwtHandler.verifyKey(refreshKey);

		const { user } = authGetEntity;
		
		if (user.sub !== sub) {
			// Token reuse or compromise detected
			await this.authRepository.destroy<AuthEntity>({
				where: {
					user: user
				}
			})
			throw new EmptyError("User sub does not match", HttpStatus.CONFLICT)
		}

		await this.authRepository.destroy<AuthEntity>({
			where: {
				key
			}
		})

		const tokens = await this.getJwtTokens(user.sub, user.email, user.id);
		
		return tokens;
	}

	async destroyKey(key: string): Promise<void> {
		const authGetEntity = await this.authRepository.findOne<AuthEntity>({
			where: {
				key
			}
		});
		
		if (!authGetEntity) {
			throw new EmptyError("Unable to found token", HttpStatus.UNAUTHORIZED)
		}

		await this.authRepository.destroy<AuthEntity>({
			where: {
				key
			}
		})


	}

	async destroyAllKeys(key: string): Promise<void> {
		const authGetEntity = await this.authRepository.findOne<AuthEntity>({
			where: {
				key
			},
			include: [
				{
					model: UserEntity,
				}
			]
		});
		
		if (!authGetEntity) {
			throw new EmptyError("Unable to found token", HttpStatus.UNAUTHORIZED)
		}

		
		await this.authRepository.destroy<AuthEntity>({
			where: {
				user: authGetEntity.user
			}
		})
	}
	
}
