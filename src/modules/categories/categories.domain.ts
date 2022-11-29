import { AggregateRoot } from 'src/core/domain';
import { CompanyDomain } from '../companies/company.domain';

export interface ICategoryProps {
  title: string;
  description: string;
  iconId: string;
  company: CompanyDomain;
}

export class CategoryDomain extends AggregateRoot<ICategoryProps> {
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get iconId() {
    return this.props.iconId;
  }

  get company() {
    return this.props.company;
  }
}
