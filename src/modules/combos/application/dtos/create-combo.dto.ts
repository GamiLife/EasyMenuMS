/* eslint-disable @typescript-eslint/no-namespace */
export class CreateComboRequestDTO {
  title: string;
  description: string;
  maxItems: number;
  dishId: number;
  companyId: number;
  dishInCombo: CreateComboRequestDTO.DishInCombo[];
  sauceInCombo: CreateComboRequestDTO.SauceInCombo[];
}

export namespace CreateComboRequestDTO {
  export class DishInCombo {
    maxItemsByRow: number;
    priceByUnit: number;
    dishId: number;
  }
  export class SauceInCombo {
    maxItemsByRow: number;
    priceByUnit: number;
    sauceId: number;
  }
}

export class CreateComboResponseDTO {
  id: number;
  title: string;
  description: string;
}
