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
      Partial<Pick<CategoryEntity, 'company' | 'id'>>
  ): CategoryDomain {
    const companyDomain = entity.company
      ? CompanyMapper.entityToDomain(entity.company)
      : undefined;

    const domain = new CategoryDomain({
      title: entity.title,
      description: entity.description,
      iconId: entity.iconId,
      company: companyDomain,
      id: entity.id,
    });

    return domain;
  }

  static entitiesToDomains(entities: CategoryEntity[]): CategoryDomain[] {
    return entities.map((entity) => CategoryMapper.entityToDomain(entity));
  }

  static updateDtoToDomain(dto: CategoryUpdateDto): CategoryDomain {
    const companyDomain = CompanyMapper.entityToDomain({
      id: dto.companyId,
      name: undefined,
      description: undefined,
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
