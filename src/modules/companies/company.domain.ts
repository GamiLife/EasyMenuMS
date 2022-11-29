import { AggregateRoot } from 'src/core/domain';

export interface ICompanyDomainProps {
  name: string;
  description: string;
}

export class CompanyDomain extends AggregateRoot<ICompanyDomainProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }
}
