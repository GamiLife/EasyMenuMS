/* eslint-disable @typescript-eslint/no-namespace */
export class GetDishRequestDTO {
  companyId: number;
}

export class GetDishResponseDTO {
  id: number;
  title: string;
  description: string;
  slug?: string;
  priceByUnit: number;
  maxItems: number;
  imageUrl: string;

  combos: GetDishResponseDTO.Combo[];
}

export namespace GetDishResponseDTO {
  export class Dish {
    id: number;
    title: string;
    description: string;
    priceByUnit: number;
    imageUrl: string;
  }

  export class DishInCombo {
    dish: Dish;
    id: number;
    maxItemsByRow: number;
    priceByUnit: number;
  }

  export class Sauce {
    id: number;
    title: string;
    description: string;
    priceByUnit: number;
    imageUrl: string;
  }

  export class SauceInCombo {
    sauce: Sauce;
    id: number;
    maxItemsByRow: number;
    priceByUnit: number;
  }

  export class Combo {
    id: number;
    title: string;
    description: string;
    maxItems: number;

    dishes: DishInCombo[];
    sauces: SauceInCombo[];
  }
}
