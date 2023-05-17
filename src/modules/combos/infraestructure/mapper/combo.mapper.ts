import { Dish } from 'src/modules/dishes/domain/dish.entity';
import { Combo } from '../../domain/combo.entiy';
import { CombosModel } from '../db/combos.model';
import { DishInCombo } from 'src/modules/dishes/domain/dishInCombo.entity';
import { SauceInCombo } from 'src/modules/sauces/domain/sauceInCombo.entity';
import { Sauce } from 'src/modules/sauces/domain/sauce.entity';
import {
  CreateComboRequestDTO,
  GetComboCollectionResponseDTO,
  GetComboResponseDTO,
  UpdateComboRequestDTO,
} from '../../application/dtos';
import { ComboDishesModel } from '../db/combo-dishes.model';
import { ComboSauceModel } from '../db/combo-sauces.model';

abstract class AComboMapper {
  static toPersistence: (domain: Combo) => Partial<CombosModel>;
  static toDomain: (entity: CombosModel) => Combo;
  static toDomains: (entity: CombosModel[]) => Combo[];
}

export class ComboMapper extends AComboMapper {
  static toDishInComboPersistence(
    dishInCombo: DishInCombo,
    comboId: number
  ): Partial<ComboDishesModel> {
    return {
      priceByUnit: dishInCombo.priceByUnit,
      comboId,
      secondarydishId: dishInCombo.dish.id,
      maxItemsByRow: dishInCombo.maxItemsByRow,
    };
  }

  static toSauceInComboPersistence(
    sauceInCombo: SauceInCombo,
    comboId: number
  ): Partial<ComboSauceModel> {
    return {
      priceByUnit: sauceInCombo.priceByUnit,
      comboId,
      sauceId: sauceInCombo.sauce.id,
      maxItemsByRow: sauceInCombo.maxItemsByRow,
    };
  }

  static toPersistence(domain: Combo): Partial<CombosModel> {
    return {
      title: domain.title,
      description: domain.description,
      maxItems: domain.maxItems,
      dishId: domain.principalDish?.id,
      companyId: domain.company?.id,
    };
  }

  static toDomain({ id, ...entity }: CombosModel): Combo {
    return Combo.create(entity, id);
  }

  static toDomainWithDetail({
    dishCombo,
    dishesFromCombo,
    saucesFromCombo,
    id,
    ...model
  }: CombosModel): Combo {
    const principalDish = Dish.create(
      {
        title: dishCombo.title,
        description: dishCombo.description,
        priceByUnit: dishCombo.priceByUnit,
        imageUrl: dishCombo.imageUrl,
        maxItems: dishCombo.maxItems,
      },
      dishCombo.id
    );
    const dishes = dishesFromCombo.map(
      ({ dataValues: { ComboDishesModel, ...dish } }: any) =>
        DishInCombo.create(
          {
            dish: Dish.create(dish, dish?.id),
            ...ComboDishesModel?.dataValues,
          },
          ComboDishesModel?.dataValues?.id
        )
    );
    const sauces = saucesFromCombo.map(
      ({ dataValues: { ComboSauceModel, ...sauce } }: any) =>
        SauceInCombo.create(
          {
            sauce: Sauce.create(sauce, sauce?.id),
            ...ComboSauceModel?.dataValues,
          },
          ComboSauceModel?.dataValues?.id
        )
    );

    return Combo.create(
      {
        ...model,
        principalDish,
        dishes,
        sauces,
      },
      id
    );
  }

  static toDomains(entities: CombosModel[]): Combo[] {
    return entities.map((entity) =>
      Combo.create(
        {
          title: entity.title,
          description: entity.description,
          maxItems: entity.maxItems,
        },
        entity.id
      )
    );
  }

  static toGetComboResponse(combo: Combo): GetComboResponseDTO {
    const plainCombo = combo.toJson();

    return {
      ...plainCombo,
      principalDish: plainCombo.principalDish.toJson(),
      dishes: plainCombo.dishes.map((dish) => ({
        ...dish.toJson(),
        dish: dish.toJson().dish.toJson(),
      })),
      sauces: plainCombo.sauces.map((sauce) => ({
        ...sauce.toJson(),
        sauce: sauce.toJson().sauce.toJson(),
      })),
    };
  }

  static toGetComboCollectionResponseDto(
    combos: Combo[]
  ): GetComboCollectionResponseDTO[] {
    return combos.map(({ id, title, description, maxItems }) => ({
      id,
      title,
      description,
      maxItems,
    }));
  }

  static toDishComboDomainFromCreateComboRequestDto(
    dto: CreateComboRequestDTO.DishInCombo
  ) {
    return new DishInCombo({
      maxItemsByRow: dto.maxItemsByRow,
      priceByUnit: dto.priceByUnit,
      dish: new Dish(
        {
          title: '',
          description: '',
          priceByUnit: 0,
          maxItems: 0,
          imageUrl: '',
        },
        dto.dishId
      ),
    });
  }

  static toSauceComboDomainFromCreateComboRequestDto(
    dto: CreateComboRequestDTO.SauceInCombo
  ) {
    return new SauceInCombo({
      maxItemsByRow: dto.maxItemsByRow,
      priceByUnit: dto.priceByUnit,
      sauce: new Sauce(
        {
          title: '',
          description: '',
          priceByUnit: 0,
          maxItems: 0,
          imageUrl: '',
        },
        dto.sauceId
      ),
    });
  }

  static toDomainFromCreateComboRequestDto({
    title,
    description,
    maxItems,
    dishId,
    companyId,
  }: CreateComboRequestDTO) {
    return Combo.create({
      title,
      description,
      maxItems,
      principalDish: new Dish(
        {
          title: '',
          description: '',
          priceByUnit: 0,
          maxItems: 0,
          imageUrl: '',
        },
        dishId
      ),
      company: {
        id: companyId,
      },
    });
  }

  static toDomainFromUpdateComboRequestDto(
    { title, description, maxItems, dishId, companyId }: UpdateComboRequestDTO,
    id: number
  ) {
    return Combo.create(
      {
        title,
        description,
        maxItems,
        principalDish: new Dish(
          {
            title: '',
            description: '',
            priceByUnit: 0,
            maxItems: 0,
            imageUrl: '',
          },
          dishId
        ),
        company: {
          id: companyId,
        },
      },
      id
    );
  }

  static toCreateComboResponseDto({ id, title, description }: Combo) {
    return { title, description, id };
  }

  static toUpdateComboResponseDto({ id, title, description }: Combo) {
    return { title, description, id };
  }
}
