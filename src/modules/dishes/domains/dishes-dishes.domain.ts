import { AggregateRoot } from 'src/core/domain';
import { DishDomain } from './dishes.domain';

export interface IDishDishProps {
  price: number;
  dish: DishDomain;
  dishSecond: DishDomain;
}

export class DishDishDomain extends AggregateRoot<IDishDishProps> {
  get price() {
    return this.props.price;
  }

  get dish() {
    return this.props.dish;
  }

  get dishSecond() {
    return this.props.dishSecond;
  }
}
