import { plainToClass } from '@nestjs/class-transformer';
import { Combo } from 'src/modules/combos/domain/Combo.entiy';
import { SauceInCombo } from 'src/modules/sauces/domain/sauceInCombo.entity';
import { GetDishResponseDTO } from '../../application/dtos';
import {
  CreateDishRequestDTO,
  CreateDishResponseDTO,
} from '../../application/dtos/create-dish.dto';
import { GetDishCollectionResponseDTO } from '../../application/dtos/get-collection.dto';
import {
  UpdateDishRequestDTO,
  UpdateDishResponseDTO,
} from '../../application/dtos/update-dish.dto';
import { Dish } from '../../domain/dish.entity';
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
    return plainToClass(Dish, entities);
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
            dishes: dishesFromCombo.map(({ ComboSauceEntity, ...dish }: any) =>
              DishInCombo.create(
                {
                  dish,
                  ...ComboSauceEntity,
                },
                ComboSauceEntity?.id
              )
            ),
            sauces: saucesFromCombo.map(({ ComboSauceEntity, ...sauce }: any) =>
              SauceInCombo.create(
                {
                  sauce,
                  ...ComboSauceEntity,
                },
                ComboSauceEntity?.id
              )
            ),
          },
          id
        )
    );
    const dishesProps = { combos: combosTransform, ...entity };
    return Dish.create(dishesProps, entity.id);
  }

  static toGetDishResponseDto(domain: Dish): GetDishResponseDTO {
    return plainToClass(GetDishResponseDTO, domain, {
      excludeExtraneousValues: true,
    });
  }

  static toGetDishCollectionResponseDto(
    dishes: Dish[]
  ): GetDishCollectionResponseDTO[] {
    return dishes.map(
      ({
        id,
        title,
        description,
        priceByUnit,
        imageUrl,
        category: { id: categoryId },
      }) => ({ id, title, description, priceByUnit, imageUrl, categoryId })
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
