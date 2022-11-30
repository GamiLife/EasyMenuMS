import { DishDishDomain } from '../domains';
import { DishDishResponseDto, DishDishUpdateDto } from '../dtos';
import { DishMapper } from './dish.mapper';
import { DishDishesEntity } from '../entities';

export class DishDishMapper {
  static domainToResponse(domain: DishDishDomain): DishDishResponseDto {
    const response = domain.props;
    const dish = response?.dish?.props;
    const dishSecond = response?.dishSecond?.props;

    return { ...response, id: domain.id, dish, dishSecond };
  }

  static domainsToResponses(domains: DishDishDomain[]): DishDishResponseDto[] {
    return domains.map((domain) => DishDishMapper.domainToResponse(domain));
  }

  static entityToDomain(entity: DishDishesEntity): DishDishDomain {
    const dishDomain = entity?.dish
      ? DishMapper.entityToDomain(entity.dish)
      : undefined;
    const dishSecondDomain = entity?.dishSecond
      ? DishMapper.entityToDomain(entity.dishSecond)
      : undefined;

    const domain = new DishDishDomain({
      price: entity.price,
      dish: dishDomain,
      dishSecond: dishSecondDomain,
    });

    return domain;
  }

  static entitiesToDomains(entities: DishDishesEntity[]): DishDishDomain[] {
    return entities.map((entity) => DishDishMapper.entityToDomain(entity));
  }

  static updateDtoToDomain(dto: DishDishUpdateDto): DishDishDomain {
    const dishDomain = DishMapper.entityToDomain({
      title: '',
      description: '',
      price: 0,
      imageUrl: '',
    });
    const dishSecondDomain = DishMapper.entityToDomain({
      title: '',
      description: '',
      price: 0,
      imageUrl: '',
    });

    const domain = new DishDishDomain({
      price: dto.price,
      dish: dishDomain,
      dishSecond: dishSecondDomain,
    });
    return domain;
  }
}
