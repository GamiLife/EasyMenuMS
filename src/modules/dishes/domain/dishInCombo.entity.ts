import { Entity } from 'src/core/domain';
import { Guard } from 'src/core/helpers';
import { Dish } from './dish.entity';

export interface IDishInComboProps {
  maxItemsByRow: number;
  priceByUnit: number;
  dish: Dish;
}

export class DishInCombo extends Entity<IDishInComboProps> {
  get id() {
    return this._id;
  }

  get dish() {
    return this.props.dish;
  }

  get maxItemsByRow() {
    return this.props.maxItemsByRow;
  }

  get priceByUnit() {
    return this.props.priceByUnit;
  }

  public constructor(props: IDishInComboProps, id?: number) {
    super(props, id);
  }

  public static create(props: IDishInComboProps, id?: number): DishInCombo {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.dish, argumentName: 'dish' },
    ]);

    if (!guardResult.succeeded) {
      throw new Error(`Error creating dishInCombo: ${guardResult.message}`);
    } else {
      return new DishInCombo(
        {
          ...props,
        },
        id
      );
    }
  }
}
