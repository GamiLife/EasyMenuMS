import { plainToClass } from '@nestjs/class-transformer';
import { Combo } from 'src/modules/combos/domain/Combo.entiy';
import { Sauce } from 'src/modules/sauces/domain/sauce.entity';
import { SauceInCombo } from 'src/modules/sauces/domain/sauceInCombo.entity';
import { GetDishResponseDTO } from '../../application/dtos';
import { CreateDishRequestDTO } from '../../application/dtos/create-dish.dto';
import { GetDishCollectionResponseDTO } from '../../application/dtos/get-collection.dto';
import { UpdateDishRequestDTO } from '../../application/dtos/update-dish.dto';
import { Dish, IDishProps } from '../../domain/dish.entity';
import { DishInCombo } from '../../domain/dishInCombo.entity';
import { DishModel } from '../db/dish.model';

abstract class ADishMapper {
  static toPersistence: (domain: Dish) => DishModel;
  static toDomain: (entity: DishModel) => Dish;
  static toDomains: (entity: DishModel[]) => Dish[];
}

export class DishMapper extends ADishMapper {
  static toPersistence(domain: Dish): DishModel {
    return plainToClass(DishModel, domain, {
      excludeExtraneousValues: true,
    });
  }

  static toDomain(entity: DishModel): Dish {
    return plainToClass(Dish, entity);
  }

  static toDomains(entities: DishModel[]): Dish[] {
    return entities.map((entity) =>
      Dish.create(
        {
          title: entity.title,
          description: entity.description,
          priceByUnit: entity.priceByUnit,
          imageUrl: entity.imageUrl,
          maxItems: entity.maxItems,
          slug: entity.slug,
          category: entity.category?.dataValues,
        },
        entity.id
      )
    );
  }

  static toDomainWithDetail({ combos, ...entity }: DishModel): Dish {
    const combosTransform = combos.map(
      ({
        id,
        title,
        description,
        maxItems,
        dishesFromCombo,
        saucesFromCombo,
      }) =>
        Combo.create(
          {
            title,
            description,
            maxItems,
            dishes: dishesFromCombo.map(
              ({ dataValues: { ComboDishesEntity, ...dish } }: any) =>
                DishInCombo.create(
                  {
                    dish: Dish.create(dish, dish?.id),
                    ...ComboDishesEntity?.dataValues,
                  },
                  ComboDishesEntity?.dataValues?.id
                )
            ),
            sauces: saucesFromCombo.map(
              ({ dataValues: { ComboSauceEntity, ...sauce } }: any) =>
                SauceInCombo.create(
                  {
                    sauce: Sauce.create(sauce, sauce?.id),
                    ...ComboSauceEntity?.dataValues,
                  },
                  ComboSauceEntity?.dataValues?.id
                )
            ),
          },
          id
        )
    );
    const dishesProps: IDishProps = {
      title: entity.title,
      description: entity.description,
      priceByUnit: entity.priceByUnit,
      maxItems: entity.maxItems,
      slug: entity.slug,
      imageUrl: entity.imageUrl,
      combos: combosTransform,
    };

    return Dish.create(dishesProps, entity.id);
  }

  static toGetDishResponseDto(domain: Dish): GetDishResponseDTO {
    const plainDish = domain.toJson();

    return {
      ...plainDish,
      combos: plainDish.combos.map((combo) => {
        const plainCombo = combo.toJson();
        return {
          id: plainCombo.id,
          title: plainCombo.title,
          description: plainCombo.description,
          maxItems: plainCombo.maxItems,
          dishes: plainCombo.dishes.map((dish) => {
            const plainDishCombo = dish.toJson();
            return {
              ...plainDishCombo,
              dish: plainDishCombo.dish.toJson(),
            };
          }),
          sauces: plainCombo.sauces.map((sauce) => {
            const plainSauceCombo = sauce.toJson();
            return {
              ...plainSauceCombo,
              sauce: plainSauceCombo.sauce.toJson(),
            };
          }),
        };
      }),
    };
  }

  static toGetDishCollectionResponseDto(
    dishes: Dish[]
  ): GetDishCollectionResponseDTO[] {
    return dishes.map(
      ({ id, title, description, priceByUnit, imageUrl, category }) => ({
        id,
        title,
        description,
        priceByUnit,
        imageUrl,
        categoryId: category?.id,
      })
    );
  }

  static toDomainFromCreateDishRequestDto(dto: CreateDishRequestDTO) {
    return plainToClass(Dish, dto, {
      excludeExtraneousValues: true,
    });
  }

  static toDomainFromUpdateDishRequestDto(
    dto: UpdateDishRequestDTO,
    id: number
  ) {
    return plainToClass(
      Dish,
      { ...dto, id },
      {
        excludeExtraneousValues: true,
      }
    );
  }

  static toCreateDishResponseDto({ id, title, description }: Dish) {
    return { title, description, id };
  }

  static toUpdateDishResponseDto({ title, description, id }: Dish) {
    return { title, description, id };
  }
}
