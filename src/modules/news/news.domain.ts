import { AggregateRoot } from 'src/core/domain';
import { CompanyDomain } from '../companies/company.domain';

export interface INewProps {
  title: string;
  description: string;
  imageUrl?: string;
  backgroundColor?: string;
  startDate: string;
  endDate: string;
  company: CompanyDomain;
}

export class NewDomain extends AggregateRoot<INewProps> {
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  get backgroundColor() {
    return this.props.backgroundColor;
  }

  get startDate() {
    return this.props.startDate;
  }

  get endDate() {
    return this.props.endDate;
  }

  get company() {
    return this.props.company;
  }
}
