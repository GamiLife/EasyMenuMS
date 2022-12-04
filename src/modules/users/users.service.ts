import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { DBError, EmptyError } from 'src/core/exceptions';
import { CompanyEntity } from '../companies/company.entity';
import { CompaniesService } from '../companies/company.service';
import { UserTypeEntity } from '../user-types/user-type.entity';
import { UserTypesService } from '../user-types/user-types.service';
import { UserDomainV2 } from './users.domain';
import { UserCreateDto, UserResponseDto, UserUpdateDto } from './users.dto';
import { UserEntity } from './users.entity';
import { UserMapper } from './users.mapper';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof UserEntity,

    private readonly companyService: CompaniesService,
    private readonly userTypeService: UserTypesService
  ) {}

  async create(user: UserCreateDto): Promise<UserDomainV2> {
    await this.userTypeService.findOneById(user.userTypeId);
    await this.companyService.findOneById(user.companyId);

    const userEntity = await this.userRepository
      .create<UserEntity>(user)
      .catch((reason) => {
        throw new DBError(
          `User query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    if (!userEntity) {
      throw new DBError('User query failed', HttpStatus.BAD_REQUEST);
    }

    const companyDomain = plainToClass(UserDomainV2, userEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return companyDomain;
  }

  async findOneById(id: number): Promise<UserDomainV2> {
    const userGetEntity = await this.userRepository.findOne<UserEntity>({
      where: { id },
      include: [
        {
          model: UserTypeEntity,
        },
        {
          model: CompanyEntity,
        },
      ],
    });

    if (!userGetEntity) {
      throw new EmptyError('Category not found', HttpStatus.NOT_FOUND);
    }

    const userDomain = plainToClass(UserDomainV2, userGetEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return userDomain;
  }

  async findAll(): Promise<UserDomainV2[]> {
    const usersEntity = await this.userRepository.findAll({
      include: [
        {
          model: UserTypeEntity,
          attributes: ['id'],
          required: true,
        },
        {
          model: CompanyEntity,
          attributes: ['id'],
          required: true,
        },
      ],
    });

    const usersDomain = usersEntity.map((userEntity) =>
      plainToClass(UserDomainV2, userEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    return usersDomain;
  }

  async update(user: UserUpdateDto, id: number): Promise<UserDomainV2> {
    await this.userTypeService.findOneById(user.userTypeId);
    await this.companyService.findOneById(user.companyId);

    await this.userRepository
      .update(user, {
        where: { id },
      })
      .catch((reason) => {
        throw new DBError(
          `User query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    const categoryDomain = plainToClass(UserDomainV2, user, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return categoryDomain;
  }
}
