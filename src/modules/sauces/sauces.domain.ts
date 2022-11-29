import { AggregateRoot } from 'src/core/domain';
import { CompanyDomain } from '../companies/company.domain';

export interface ISauceProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  company: CompanyDomain;
}

export class SauceDomain extends AggregateRoot<ISauceProps> {
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get price() {
    return this.props.price;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  get company() {
    return this.props.company;
  }
}
