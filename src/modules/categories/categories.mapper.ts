import { CompanyMapper } from '../companies/company.mapper';
import { CategoryDomain } from './categories.domain';
import { CategoryResponseDto, CategoryUpdateDto } from './categories.dto';
import { CategoryEntity } from './categories.entity';

export class CategoryMapper {
  static domainToResponse(domain: CategoryDomain): CategoryResponseDto {
    const response = domain.props;
    const company = response.company.props;

    return { ...response, id: domain.id, company };
  }

  static domainsToResponses(domains: CategoryDomain[]): CategoryResponseDto[] {
    return domains.map((domain) => CategoryMapper.domainToResponse(domain));
  }

  static entityToDomain(
    entity: Pick<CategoryEntity, 'title' | 'description' | 'iconId'> &
      Partial<Pick<CategoryEntity, 'company'>>
  ): CategoryDomain {
    const companyDomain = CompanyMapper.entityToDomain(entity.company);

    const domain = new CategoryDomain({
      title: entity.title,
      description: entity.description,
      iconId: entity.iconId,
      company: companyDomain,
    });

    return domain;
  }

  static entitiesToDomains(entities: CategoryEntity[]): CategoryDomain[] {
    return entities.map((entity) => CategoryMapper.entityToDomain(entity));
  }

  static updateDtoToDomain(dto: CategoryUpdateDto): CategoryDomain {
    const companyDomain = CompanyMapper.entityToDomain({
      id: dto.companyId,
      name: '',
      description: '',
    });

    const domain = new CategoryDomain({
      title: dto.title,
      description: dto.description,
      iconId: dto.iconId,
      company: companyDomain,
    });
    return domain;
  }
}
