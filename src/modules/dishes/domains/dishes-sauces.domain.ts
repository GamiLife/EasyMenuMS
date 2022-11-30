import { AggregateRoot } from 'src/core/domain';
import { SauceDomain } from 'src/modules/sauces/sauces.domain';
import { DishDomain } from './dishes.domain';

export interface IDishSauceProps {
  price: number;
  sauce: SauceDomain;
  dish: DishDomain;
}

export class DishSauceDomain extends AggregateRoot<IDishSauceProps> {
  get price() {
    return this.props.price;
  }

  get sauce() {
    return this.props.sauce;
  }

  get dish() {
    return this.props.dish;
  }
}
