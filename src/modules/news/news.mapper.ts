import { CompanyMapper } from '../companies/company.mapper';
import { NewDomain } from './news.domain';
import { NewResponseDto, NewUpdateDto } from './news.dto';
import { NewEntity } from './news.entity';

export class NewMapper {
  static domainToResponse(domain: NewDomain): NewResponseDto {
    const response = domain.props;
    const company = response.company.props;

    return { ...response, id: domain.id, company };
  }

  static domainsToResponses(domains: NewDomain[]): NewResponseDto[] {
    return domains.map((domain) => NewMapper.domainToResponse(domain));
  }

  static entityToDomain(entity: NewEntity): NewDomain {
    const companyDomain = CompanyMapper.entityToDomain(entity.company);

    const domain = new NewDomain({
      title: entity.title,
      description: entity.description,
      imageUrl: entity.imageUrl,
      backgroundColor: entity.backgroundColor,
      startDate: entity.startDate,
      endDate: entity.endDate,
      company: companyDomain,
    });

    return domain;
  }

  static entitiesToDomains(entities: NewEntity[]): NewDomain[] {
    return entities.map((entity) => NewMapper.entityToDomain(entity));
  }

  static updateDtoToDomain(dto: NewUpdateDto): NewDomain {
    const companyDomain = CompanyMapper.entityToDomain({
      id: dto.companyId,
      name: '',
      description: '',
    });

    const domain = new NewDomain({
      title: dto.title,
      description: dto.description,
      imageUrl: dto.imageUrl,
      backgroundColor: dto.backgroundColor,
      startDate: dto.startDate,
      endDate: dto.endDate,
      company: companyDomain,
    });
    return domain;
  }
}
