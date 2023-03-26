import { Entity } from 'src/core/domain';
import { Guard } from 'src/core/helpers';
import { Sauce } from './sauce.entity';

export interface ISauceInComboProps {
  id: number;
  maxItemsByRow: number;
  priceByUnit: number;
  sauce: Sauce;
}

export class SauceInCombo extends Entity<ISauceInComboProps> {
  get id() {
    return this._id;
  }

  get sauce() {
    return this.sauce;
  }

  get maxItemsByRow() {
    return this.maxItemsByRow;
  }

  get priceByUnit() {
    return this.priceByUnit;
  }

  public constructor(props: ISauceInComboProps, id?: number) {
    super(props, id);
  }

  public static create(props: ISauceInComboProps, id?: number): SauceInCombo {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.priceByUnit, argumentName: 'priceByUnit' },
      { argument: props.sauce, argumentName: 'sauce' },
    ]);

    if (!guardResult.succeeded) {
      throw new Error(`Error creating dishInCombo: ${guardResult.message}`);
    } else {
      return new SauceInCombo(
        {
          ...props,
        },
        id
      );
    }
  }
}
