import { CompanyMapper } from '../companies/company.mapper';
import { SauceDomain } from './sauces.domain';
import { SauceResponseDto, SauceUpdateDto } from './sauces.dto';
import { SauceEntity } from './sauces.entity';

export class SauceMapper {
  static domainToResponse(domain: SauceDomain): SauceResponseDto {
    const response = domain.props;
    const company = response.company.props;

    return { ...response, id: domain.id, company };
  }

  static domainsToResponses(domains: SauceDomain[]): SauceResponseDto[] {
    return domains.map((domain) => SauceMapper.domainToResponse(domain));
  }

  static entityToDomain(
    entity: Pick<SauceEntity, 'title' | 'description' | 'price' | 'imageUrl'> &
      Partial<Pick<SauceEntity, 'company'>>
  ): SauceDomain {
    const companyDomain = CompanyMapper.entityToDomain(entity.company);

    const domain = new SauceDomain({
      title: entity.title,
      description: entity.description,
      price: entity.price,
      imageUrl: entity.imageUrl,
      company: companyDomain,
    });

    return domain;
  }

  static entitiesToDomains(entities: SauceEntity[]): SauceDomain[] {
    return entities.map((entity) => SauceMapper.entityToDomain(entity));
  }

  static updateDtoToDomain(dto: SauceUpdateDto): SauceDomain {
    const companyDomain = CompanyMapper.entityToDomain({
      id: dto.companyId,
      name: '',
      description: '',
    });

    const domain = new SauceDomain({
      title: dto.title,
      description: dto.description,
      price: dto.price,
      imageUrl: dto.imageUrl,
      company: companyDomain,
    });
    return domain;
  }
}
