import { CompanyMapper } from '../companies/company.mapper';
import { UserTypeMapper } from '../user-types/user-type.mapper';
import { UserDomain } from './users.domain';
import { UserResponseDto, UserUpdateDto } from './users.dto';
import { UserEntity } from './users.entity';

export class UserMapper {
  static domainToResponse(domain: UserDomain): UserResponseDto {
    const response = domain.props;
    const userType = response.userType.props;
    const company = response.company.props;

    return { ...response, id: domain.id, userType, company };
  }

  static domainsToResponses(domains: UserDomain[]): UserResponseDto[] {
    return domains.map((domain) => UserMapper.domainToResponse(domain));
  }

  static entityToDomain(entity: UserEntity): UserDomain {
    const userTypeDomain = UserTypeMapper.entityToDomain(entity.userType);
    const companyDomain = CompanyMapper.entityToDomain(entity.company);

    const domain = new UserDomain({
      names: entity.names,
      lastnames: entity.lastnames,
      email: entity.email,
      phone: entity.phone,
      userType: userTypeDomain,
      company: companyDomain,
    });

    return domain;
  }

  static entitiesToDomains(entities: UserEntity[]): UserDomain[] {
    return entities.map((entity) => UserMapper.entityToDomain(entity));
  }

  static updateDtoToDomain(dto: UserUpdateDto): UserDomain {
    const userTypeDomain = UserTypeMapper.entityToDomain({
      id: dto.userTypeId,
      name: '',
      description: '',
    });
    const companyDomain = CompanyMapper.entityToDomain({
      id: dto.companyId,
      name: '',
      description: '',
    });

    const domain = new UserDomain({
      names: dto.names,
      lastnames: dto.lastnames,
      email: dto.email,
      phone: dto.phone,
      userType: userTypeDomain,
      company: companyDomain,
    });
    return domain;
  }
}
