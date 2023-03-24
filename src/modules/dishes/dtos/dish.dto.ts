import {
  Expose,
  plainToClass,
  Transform,
  Type,
} from '@nestjs/class-transformer';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { CategoryResponseDto } from 'src/modules/categories/categories.dto';
import { CompanyResponseDto } from 'src/modules/companies/company.dto';

/**
 * Request on create dish
 */
export class DishCreateDto {
  @IsNotEmpty({ message: 'Title required' })
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly price: number;
  @IsString()
  readonly imageUrl: string;
  @IsNotEmpty({ message: 'CategoryId required' })
  @IsNumber()
  readonly categoryId: number;
  @IsNotEmpty({ message: 'CompanyId required' })
  @IsNumber()
  readonly companyId: number;
}

/**
 * Request on update dish
 */
export class DishUpdateDto {
  @IsNotEmpty({ message: 'Title required' })
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly price: number;
  @IsString()
  readonly imageUrl: string;
  @IsNotEmpty({ message: 'CategoryId required' })
  @IsNumber()
  readonly categoryId: number;
  @IsNotEmpty({ message: 'CompanyId required' })
  @IsNumber()
  readonly companyId: number;
}

/**
 * Request on create dishDish
 */
export class DishResponseDto {
  @Expose()
  @IsNumber()
  readonly id?: number;
  @Expose()
  @IsString()
  readonly title: string;
  @Expose()
  @IsString()
  readonly slug: string;
  @Expose()
  @IsString()
  readonly description: string;
  @Expose()
  @IsNumber()
  readonly price: number;
  @Expose()
  @IsString()
  readonly imageUrl: string;
  @Expose()
  @Type(() => CategoryResponseDto)
  readonly category: CategoryResponseDto;
  @Expose()
  @Type(() => CompanyResponseDto)
  readonly company: CompanyResponseDto;
}

export class RestriccionCombo {
  @Expose()
  maxItemsByRow?: number;
  @Expose()
  price: number;
  @Expose()
  id: number;
}

export class Row {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  price: number;
  @Expose()
  imageUrl: string;
}

@Expose()
export class ComboWithDish {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  maxItems?: number | null;
  @Expose()
  @Transform(({ obj }) => {
    try {
      const restriction = obj.DishDishesEntity;
      return {
        id: restriction.id,
        price: restriction.price,
        maxItemsByRow: restriction.maxSecondaryDishes,
      };
    } catch (error) {
      return undefined;
    }
  })
  @Type(() => RestriccionCombo)
  restriction: RestriccionCombo;
  @Expose()
  @Transform(({ obj }) => {
    try {
      const secondaryDishes = obj.comboSecondDishFromDishDish;
      return secondaryDishes;
    } catch (error) {
      return [];
    }
  })
  @Type(() => Row)
  secondaryDishes: Row[];
}

@Expose()
export class ComboWithSauce {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  maxItems: number | null;
  @Expose()
  @Transform(({ obj }) => {
    try {
      const restriction = obj.DishSauceEntity;
      return {
        id: restriction.id,
        price: restriction.price,
        maxItemsByRow: restriction.maxSauces,
      };
    } catch (error) {
      return undefined;
    }
  })
  @Type(() => RestriccionCombo)
  restriction?: RestriccionCombo;
  @Expose()
  @Transform(({ obj }) => {
    try {
      const secondaryDishes = obj.comboSauceFromDishSauce;
      return secondaryDishes;
    } catch (error) {
      return [];
    }
  })
  @Type(() => Row)
  sauces: Row[];
}

export class DishDetailResponseDto {
  @Expose()
  readonly id?: number;
  @Expose()
  readonly title: string;
  @Expose()
  readonly slug: string;
  @Expose()
  readonly description: string;
  @Expose()
  readonly price: number;
  @Expose()
  readonly imageUrl: string;
  @Expose()
  @Type(() => CategoryResponseDto)
  readonly category: CategoryResponseDto;
  @Expose()
  @Type(() => CompanyResponseDto)
  readonly company: CompanyResponseDto;
  @Expose()
  @ValidateNested({ each: true })
  @Transform(({ obj }) => {
    try {
      const combosSauce = obj.dishSauceWithCombos;

      return plainToClass(ComboWithSauce, combosSauce, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      return [];
    }
  })
  @Type(() => ComboWithSauce)
  readonly combosSauce: ComboWithSauce[];
  @Expose()
  @ValidateNested({ each: true })
  @Transform(({ obj }) => {
    try {
      const combosDish = obj.dishDishWithCombos;

      return plainToClass(ComboWithDish, combosDish, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });
    } catch (error) {
      return [];
    }
  })
  @Type(() => ComboWithDish)
  readonly combosDish: ComboWithDish[];
}
