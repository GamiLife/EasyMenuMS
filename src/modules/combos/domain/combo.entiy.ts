import { Entity } from 'src/core/domain';
import { Guard } from 'src/core/helpers';
import { Dish } from 'src/modules/dishes/domain/dish.entity';
import { DishInCombo } from 'src/modules/dishes/domain/dishInCombo.entity';
import { SauceInCombo } from 'src/modules/sauces/domain/sauceInCombo.entity';

export interface IComboProps {
  title: string;
  description: string;
  maxItems: number;

  principalDish?: Dish;

  company?: any;
  dishes?: DishInCombo[];
  sauces?: SauceInCombo[];
}

export class Combo extends Entity<IComboProps> {
  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get maxItems(): number {
    return this.props.maxItems;
  }

  get company(): any {
    return this.props.company;
  }

  get principalDish(): Dish {
    return this.props.principalDish;
  }

  get dishes(): any[] {
    return this.props.dishes;
  }

  get sauces(): any[] {
    return this.props.sauces;
  }

  public constructor(props: IComboProps, id?: number) {
    super(props, id);
  }

  public static create(props: IComboProps, id?: number): Combo {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: 'title' },
      { argument: props.description, argumentName: 'description' },
    ]);

    if (!guardResult.succeeded) {
      throw new Error(`Error creating combo: ${guardResult.message}`);
    } else {
      return new Combo(
        {
          ...props,
        },
        id
      );
    }
  }
}
