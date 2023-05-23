import { Entity } from 'src/core/domain';
import { Guard } from 'src/core/helpers';

export interface IHistoryProps {
  moduleName: string;
  metadata: Record<string, any>;
  createdBy: string;
}

export class History extends Entity<IHistoryProps> {
  get id(): number {
    return this._id;
  }

  get moduleName(): string {
    return this.props.moduleName;
  }

  get metadata(): IHistoryProps['metadata'] {
    return this.props.metadata;
  }

  get createdBy(): IHistoryProps['createdBy'] {
    return this.props.createdBy;
  }

  public constructor(props: IHistoryProps, id?: number) {
    super(props, id);
  }

  public static create(props: IHistoryProps, id?: number): History {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.moduleName, argumentName: 'moduleName' },
    ]);

    if (!guardResult.succeeded) {
      throw new Error(`Error creating history: ${guardResult.message}`);
    } else {
      return new History(
        {
          ...props,
        },
        id
      );
    }
  }
}
