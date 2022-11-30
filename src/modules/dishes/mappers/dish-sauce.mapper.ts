import { DishDomain } from '../domains/dishes.domain';
import { DishEntity } from '../entities/dishes.entity';
import { DishSauceResponseDto, DishSauceUpdateDto } from '../dtos';
import { DishMapper } from './dish.mapper';
import { DishSauceEntity } from '../entities';
import { DishSauceDomain } from '../domains';
import { SauceMapper } from 'src/modules/sauces/sauces.mapper';

export class DishSauceMapper {
  static domainToResponse(domain: DishSauceDomain): DishSauceResponseDto {
    const response = domain.props;
    const dish = response?.dish?.props;
    const sauce = response?.sauce?.props;

    return { ...response, id: domain.id, dish, sauce };
  }

  static domainsToResponses(
    domains: DishSauceDomain[]
  ): DishSauceResponseDto[] {
    return domains.map((domain) => DishSauceMapper.domainToResponse(domain));
  }

  static entityToDomain(entity: DishSauceEntity): DishSauceDomain {
    const dishDomain = entity?.dish
      ? DishMapper.entityToDomain(entity.dish)
      : undefined;
    const sauceDomain = entity?.sauce
      ? SauceMapper.entityToDomain(entity.sauce)
      : undefined;

    const domain = new DishSauceDomain({
      price: entity.price,
      dish: dishDomain,
      sauce: sauceDomain,
    });

    return domain;
  }

  static entitiesToDomains(entities: DishSauceEntity[]): DishSauceDomain[] {
    return entities.map((entity) => DishSauceMapper.entityToDomain(entity));
  }

  static updateDtoToDomain(dto: DishSauceUpdateDto): DishSauceDomain {
    const dishDomain = DishMapper.entityToDomain({
      title: '',
      description: '',
      price: 0,
      imageUrl: '',
    });
    const sauceDomain = SauceMapper.entityToDomain({
      title: '',
      description: '',
      price: 0,
      imageUrl: '',
    });

    const domain = new DishSauceDomain({
      price: dto.price,
      dish: dishDomain,
      sauce: sauceDomain,
    });
    return domain;
  }
}
