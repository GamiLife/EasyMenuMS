/* eslint-disable @typescript-eslint/no-namespace */

export class GetComboRequestDTO {}

export class GetComboResponseDTO {
  title: string;
  description: string;
  maxItems: number;

  principalDish: GetComboResponseDTO.Dish;

  dishes: GetComboResponseDTO.DishInCombo[];
  sauces: GetComboResponseDTO.SauceInCombo[];
}

export namespace GetComboResponseDTO {
  export class Dish {
    id: number;
    title: string;
    description: string;

    priceByUnit?: number;
    maxItems?: number;
  }

  export class Sauce {
    id: number;
    title: string;
    description: string;

    priceByUnit?: number;
    maxItems?: number;
  }

  export class DishInCombo {
    id: number;
    maxItemsByRow: number;
    priceByUnit: number;
    dish: Dish;
  }
  export class SauceInCombo {
    id: number;
    maxItemsByRow: number;
    priceByUnit: number;
    sauce: Sauce;
  }
}
