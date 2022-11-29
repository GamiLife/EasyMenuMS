import { CompanyDomain } from './company.domain';
import { CompanyResponseDto, CompanyUpdateDto } from './company.dto';
import { CompanyEntity } from './company.entity';

export class CompanyMapper {
  static domainToResponse(domain: CompanyDomain): CompanyResponseDto {
    const response = domain.props;

    return { ...response, id: domain.id };
  }

  static domainsToResponses(domains: CompanyDomain[]): CompanyResponseDto[] {
    return domains.map((domain) => CompanyMapper.domainToResponse(domain));
  }

  static entityToDomain(
    entity: Pick<CompanyEntity, 'name' | 'description' | 'id'>
  ): CompanyDomain {
    const domain = new CompanyDomain({
      name: entity?.name,
      description: entity?.description,
    });

    return domain;
  }

  static entitiesToDomains(entities: CompanyEntity[]): CompanyDomain[] {
    return entities.map((entity) => CompanyMapper.entityToDomain(entity));
  }

  static updateDtoToDomain(dto: CompanyUpdateDto): CompanyDomain {
    const domain = new CompanyDomain({
      name: dto.name,
      description: dto.description,
    });

    return domain;
  }
}
