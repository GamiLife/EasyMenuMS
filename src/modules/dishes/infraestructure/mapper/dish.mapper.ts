import { plainToClass } from '@nestjs/class-transformer';
import { Combo } from 'src/modules/combos/domain/combo.entiy';
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
  static toPersistence: (domain: Dish) => Partial<DishModel>;
  static toDomain: (entity: DishModel) => Dish;
  static toDomains: (entity: DishModel[]) => Dish[];
}

export class DishMapper extends ADishMapper {
  static toPersistence(domain: Dish): Partial<DishModel> {
    const model = plainToClass(DishModel, domain, {
      excludeExtraneousValues: true,
    });
    return {
      title: model.title,
      slug: model.slug,
      description: model.description,
      priceByUnit: model.priceByUnit,
      maxItems: model.maxItems,
      imageUrl: model.imageUrl,
    };
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
              ({ dataValues: { ComboDishesModel, ...dish } }: any) =>
                DishInCombo.create(
                  {
                    dish: Dish.create(dish, dish?.id),
                    ...ComboDishesModel?.dataValues,
                  },
                  ComboDishesModel?.dataValues?.id
                )
            ),
            sauces: saucesFromCombo.map(
              ({ dataValues: { ComboSauceModel, ...sauce } }: any) =>
                SauceInCombo.create(
                  {
                    sauce: Sauce.create(sauce, sauce?.id),
                    ...ComboSauceModel?.dataValues,
                  },
                  ComboSauceModel?.dataValues?.id
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
      ({ id, title, description, priceByUnit, imageUrl, slug, category }) => ({
        id,
        title,
        description,
        priceByUnit,
        imageUrl,
        slug,
        categoryId: category?.id,
      })
    );
  }

  static toDomainFromCreateDishRequestDto(
    dto: CreateDishRequestDTO,
    imageUrl: string
  ) {
    return Dish.create({
      ...dto,
      imageUrl,
    });
  }

  static toDomainFromUpdateDishRequestDto(
    dto: UpdateDishRequestDTO,
    imageUrl: string,
    id: number
  ) {
    return Dish.create(
      {
        ...dto,
        imageUrl,
      },
      id
    );
  }

  static toCreateDishResponseDto({ id, title, description }: Dish) {
    return { title, description, id };
  }

  static toUpdateDishResponseDto({ title, description, id }: Dish) {
    return { title, description, id };
  }

  static toGetShortInfoResponseDto({
    id,
    title,
    description,
    slug,
    priceByUnit,
    maxItems,
    imageUrl,
  }: Dish) {
    return {
      id,
      title,
      description,
      slug,
      priceByUnit,
      maxItems,
      imageUrl,
    };
  }

  static toDomainWithShortInfo({
    id,
    title,
    description,
    slug,
    priceByUnit,
    maxItems,
    imageUrl,
  }: DishModel) {
    return Dish.create(
      {
        title,
        description,
        slug,
        priceByUnit,
        maxItems,
        imageUrl,
      },
      id
    );
  }
}
