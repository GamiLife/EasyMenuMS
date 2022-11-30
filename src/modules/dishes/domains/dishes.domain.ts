import { AggregateRoot } from 'src/core/domain';
import { CategoryDomain } from '../../categories/categories.domain';
import { CompanyDomain } from '../../companies/company.domain';

export interface IDishProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: CategoryDomain;
  company: CompanyDomain;
}

export class DishDomain extends AggregateRoot<IDishProps> {
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

  get category() {
    return this.props.category;
  }

  get company() {
    return this.props.company;
  }
}
