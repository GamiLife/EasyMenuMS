import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { USER_TYPE_REPOSITORY } from 'src/core/constants';
import { DBError, EmptyError } from 'src/core/exceptions';
import { UserTypeDomainV2 } from './user-type.domain';
import { UserTypeCreateDto, UserTypeUpdateDto } from './user-type.dto';
import { UserTypeEntity } from './user-type.entity';

@Injectable()
export class UserTypesService {
  constructor(
    @Inject(USER_TYPE_REPOSITORY)
    private readonly userTypeRepository: typeof UserTypeEntity
  ) {}

  async create(userType: UserTypeCreateDto): Promise<UserTypeDomainV2> {
    const userTypeEntity = await this.userTypeRepository
      .create<UserTypeEntity>(userType)
      .catch((reason) => {
        throw new DBError(
          `UserType query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    if (!userTypeEntity) {
      throw new DBError('UserType query failed', HttpStatus.BAD_REQUEST);
    }

    const companyDomain = plainToClass(UserTypeDomainV2, userTypeEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return companyDomain;
  }

  async findOneById(id: number): Promise<UserTypeDomainV2> {
    const userTypeEntity =
      await this.userTypeRepository.findOne<UserTypeEntity>({
        where: { id },
      });

    if (!userTypeEntity) {
      throw new EmptyError('UserType not found', HttpStatus.NOT_FOUND);
    }

    const companyDomain = plainToClass(UserTypeDomainV2, userTypeEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return companyDomain;
  }

  async findAll(): Promise<UserTypeDomainV2[]> {
    const userTypesEntity = await this.userTypeRepository.findAll({});

    const userTypesDomain = userTypesEntity.map((userTypeEntity) =>
      plainToClass(UserTypeDomainV2, userTypeEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    return userTypesDomain;
  }

  async update(
    userType: UserTypeUpdateDto,
    id: number
  ): Promise<UserTypeDomainV2> {
    await this.userTypeRepository
      .update(userType, {
        where: { id },
      })
      .catch((reason) => {
        throw new DBError(
          `UserType query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    const userTypeDomain = plainToClass(UserTypeDomainV2, userType, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return userTypeDomain;
  }
}
