import { Inject, Injectable } from '@nestjs/common';
import { USER_TYPE_REPOSITORY } from 'src/core/constants';
import { UserTypeDomain } from './user-type.domain';
import {
  UserTypeCreateDto,
  UserTypeResponseDto,
  UserTypeUpdateDto,
} from './user-type.dto';
import { UserTypeEntity } from './user-type.entity';
import { UserTypeMapper } from './user-type.mapper';

@Injectable()
export class UserTypesService {
  constructor(
    @Inject(USER_TYPE_REPOSITORY)
    private readonly userTypeRepository: typeof UserTypeEntity
  ) {}

  async create(userType: UserTypeCreateDto): Promise<UserTypeResponseDto> {
    const userTypeCreated =
      await this.userTypeRepository.create<UserTypeEntity>(userType);

    const userTypeDomain = UserTypeMapper.entityToDomain(userTypeCreated);
    const userTypeResponse = UserTypeMapper.domainToResponse(userTypeDomain);

    return userTypeResponse;
  }

  async findOneById(id: number): Promise<UserTypeResponseDto> {
    const userTypeGet = await this.userTypeRepository.findOne<UserTypeEntity>({
      where: { id },
    });

    const userTypeDomain = UserTypeMapper.entityToDomain(userTypeGet);
    const userTypeResponse = UserTypeMapper.domainToResponse(userTypeDomain);

    return userTypeResponse;
  }

  async findAll(): Promise<UserTypeResponseDto[]> {
    const userTypes = await this.userTypeRepository.findAll();
    const userTypesDomain = UserTypeMapper.entitiesToDomains(userTypes);
    const userTypesResponse =
      UserTypeMapper.domainsToResponses(userTypesDomain);

    return userTypesResponse;
  }

  async update(
    userType: UserTypeUpdateDto,
    id: number
  ): Promise<UserTypeResponseDto> {
    await this.userTypeRepository.update(userType, {
      where: { id },
    });
    const userTypeDomain = UserTypeMapper.updateDtoToDomain(userType);
    const userTypeResponse = UserTypeMapper.domainToResponse(userTypeDomain);

    return userTypeResponse;
  }
}
