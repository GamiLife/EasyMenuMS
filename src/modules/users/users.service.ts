import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { CompanyEntity } from '../companies/company.entity';
import { UserTypeEntity } from '../user-types/user-type.entity';
import { UserCreateDto, UserResponseDto, UserUpdateDto } from './users.dto';
import { UserEntity } from './users.entity';
import { UserMapper } from './users.mapper';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof UserEntity
  ) {}

  async create(user: UserCreateDto): Promise<UserResponseDto> {
    const userCreated = await this.userRepository.create<UserEntity>(user);
    const userDomain = UserMapper.entityToDomain(userCreated);
    const userResponse = UserMapper.domainToResponse(userDomain);

    return userResponse;
  }

  async findOneById(id: number): Promise<UserResponseDto> {
    const userGet = await this.userRepository.findOne<UserEntity>({
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
    const userDomain = UserMapper.entityToDomain(userGet);
    const userResponse = UserMapper.domainToResponse(userDomain);

    return userResponse;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll({
      include: [
        {
          model: UserTypeEntity,
        },
        {
          model: CompanyEntity,
        },
      ],
    });
    const usersDomain = UserMapper.entitiesToDomains(users);
    const usersResponse = UserMapper.domainsToResponses(usersDomain);

    return usersResponse;
  }

  async update(user: UserUpdateDto, id: number): Promise<UserResponseDto> {
    await this.userRepository.update(user, {
      where: { id },
    });
    const userDomain = UserMapper.updateDtoToDomain(user);
    const userResponse = UserMapper.domainToResponse(userDomain);

    return userResponse;
  }
}
