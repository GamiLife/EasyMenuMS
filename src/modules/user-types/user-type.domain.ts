import { AggregateRoot } from 'src/core/domain';

export interface IUserTypeProps {
  name: string;
  description: string;
}

export class UserTypeDomain extends AggregateRoot<IUserTypeProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }
}
