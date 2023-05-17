import { Entity } from 'src/core/domain';
import { Guard } from 'src/core/helpers';
import { Combo } from 'src/modules/combos/domain/combo.entiy';

export interface IDishProps {
  title: string;
  description: string;
  priceByUnit: number;
  maxItems: number;

  imageUrl: string;

  slug?: string;

  category?: any;
  company?: any;
  combos?: Combo[];
}

export class Dish extends Entity<IDishProps> {
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

  get slug(): string {
    return this.props.slug;
  }

  get imageUrl(): string {
    return this.props.imageUrl;
  }

  set imageUrl(imageUrlProp: string) {
    this.props['imageUrl'] = imageUrlProp;
  }

  get category(): any {
    return this.props.category;
  }

  get company(): any {
    return this.props.company;
  }

  get combos(): Combo[] {
    return this.props.combos;
  }

  public constructor(props: IDishProps, id?: number) {
    super(props, id);
  }

  public static create(props: IDishProps, id?: number): Dish {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: 'title' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.imageUrl, argumentName: 'imageUrl' },
      { argument: props.priceByUnit, argumentName: 'priceByUnit' },
    ]);

    if (!guardResult.succeeded) {
      throw new Error(`Error creating dish: ${guardResult.message}`);
    } else {
      return new Dish(
        {
          ...props,
        },
        id
      );
    }
  }
}
