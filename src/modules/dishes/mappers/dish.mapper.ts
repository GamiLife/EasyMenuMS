import { CategoryMapper } from '../../categories/categories.mapper';
import { CompanyMapper } from '../../companies/company.mapper';
import { DishDomain } from '../domains/dishes.domain';
import { DishResponseDto, DishUpdateDto } from '../dtos';
import { DishEntity } from '../entities/dishes.entity';

export class DishMapper {
  static domainToResponse(domain: DishDomain): DishResponseDto {
    const response = domain.props;
    const category = response?.category?.props;
    const company = response?.company?.props;

    return { ...response, id: domain.id, category, company };
  }

  static domainsToResponses(domains: DishDomain[]): DishResponseDto[] {
    return domains.map((domain) => DishMapper.domainToResponse(domain));
  }

  static entityToDomain(
    entity: Pick<DishEntity, 'title' | 'description' | 'imageUrl' | 'price'> &
      Partial<Pick<DishEntity, 'category' | 'company' | 'id'>>
  ): DishDomain {
    const categoryDomain = entity?.category
      ? CategoryMapper.entityToDomain(entity.category)
      : undefined;
    const companyDomain = entity?.company
      ? CompanyMapper.entityToDomain(entity.company)
      : undefined;

    const domain = new DishDomain(
      {
        title: entity.title,
        description: entity.description,
        price: entity.price,
        imageUrl: entity.imageUrl,
        category: categoryDomain,
        company: companyDomain,
      },
      entity.id
    );

    return domain;
  }

  static entitiesToDomains(entities: DishEntity[]): DishDomain[] {
    return entities.map((entity) => DishMapper.entityToDomain(entity));
  }

  static updateDtoToDomain(dto: DishUpdateDto): DishDomain {
    const companyDomain = CompanyMapper.entityToDomain({
      id: dto.companyId,
      name: '',
      description: '',
    });
    const categoryDomain = CategoryMapper.entityToDomain({
      id: dto.categoryId,
      title: '',
      description: '',
      iconId: '',
    });

    const domain = new DishDomain({
      title: dto.title,
      description: dto.description,
      price: dto.price,
      imageUrl: dto.imageUrl,
      category: categoryDomain,
      company: companyDomain,
    });
    return domain;
  }
}
