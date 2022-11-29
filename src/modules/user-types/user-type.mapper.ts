import { UserTypeDomain } from './user-type.domain';
import { UserTypeResponseDto, UserTypeUpdateDto } from './user-type.dto';
import { UserTypeEntity } from './user-type.entity';

export class UserTypeMapper {
  static domainToResponse(domain: UserTypeDomain): UserTypeResponseDto {
    const response = domain.props;

    return { ...response, id: domain.id };
  }

  static domainsToResponses(domains: UserTypeDomain[]): UserTypeResponseDto[] {
    return domains.map((domain) => UserTypeMapper.domainToResponse(domain));
  }

  static entityToDomain(
    entity: Pick<UserTypeEntity, 'name' | 'description' | 'id'>
  ): UserTypeDomain {
    const domain = new UserTypeDomain({
      name: entity?.name,
      description: entity?.description,
    });

    return domain;
  }

  static entitiesToDomains(entities: UserTypeEntity[]): UserTypeDomain[] {
    return entities.map((entity) => UserTypeMapper.entityToDomain(entity));
  }

  static updateDtoToDomain(dto: UserTypeUpdateDto): UserTypeDomain {
    const domain = new UserTypeDomain({
      name: dto.name,
      description: dto.description,
    });

    return domain;
  }
}
