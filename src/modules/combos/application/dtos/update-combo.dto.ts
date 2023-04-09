import { TOperations } from 'src/core/types';

/* eslint-disable @typescript-eslint/no-namespace */
export class UpdateComboRequestDTO {
  title: string;
  description: string;
  maxItems: number;
  dishId: number;
  companyId: number;
  dishInCombo: UpdateComboRequestDTO.DishInCombo[];
  sauceInCombo: UpdateComboRequestDTO.SauceInCombo[];
}

export namespace UpdateComboRequestDTO {
  export class DishInCombo {
    id?: number;
    maxItemsByRow: number;
    priceByUnit: number;
    dishId: number;
    readonly operation: TOperations;
  }
  export class SauceInCombo {
    id?: number;
    maxItemsByRow: number;
    priceByUnit: number;
    sauceId: number;
    readonly operation: TOperations;
  }
}

export class UpdateComboResponseDTO {
  id: number;
  title: string;
  description: string;
}
