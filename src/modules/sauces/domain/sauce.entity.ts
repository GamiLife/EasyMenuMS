import { Entity } from 'src/core/domain';
import { Guard } from 'src/core/helpers';

export interface ISauceProps {
  title: string;
  description: string;
  priceByUnit: number;
  imageUrl: string;
  maxItems: number;

  category?: any;
  company?: any;
}

export class Sauce extends Entity<ISauceProps> {
  get id(): number {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get priceByUnit(): number {
    return this.props.priceByUnit;
  }

  get maxItems(): number {
    return this.props.maxItems;
  }

  get imageUrl(): string {
    return this.props.imageUrl;
  }

  get category(): any {
    return this.props.category;
  }

  get company(): any {
    return this.props.company;
  }

  public constructor(props: ISauceProps, id?: number) {
    super(props, id);
  }

  public static create(props: ISauceProps, id?: number): Sauce {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: 'title' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.imageUrl, argumentName: 'imageUrl' },
      { argument: props.priceByUnit, argumentName: 'priceByUnit' },
    ]);

    if (!guardResult.succeeded) {
      throw new Error(`Error creating sauce: ${guardResult.message}`);
    } else {
      return new Sauce(
        {
          ...props,
        },
        id
      );
    }
  }
}
