import { AggregateRoot } from 'src/core/domain';
import { CompanyDomain } from '../companies/company.domain';
import { UserTypeDomain } from '../user-types/user-type.domain';

export interface IUserProps {
  names: string;
  lastnames: string;
  email: string;
  phone: string;

  userType: UserTypeDomain;
  company: CompanyDomain;
}

export class UserDomain extends AggregateRoot<IUserProps> {
  get names() {
    return this.props.names;
  }

  get lastnames() {
    return this.props.lastnames;
  }

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.email;
  }

  get userType() {
    return this.props.userType;
  }

  get company() {
    return this.props.company;
  }
}
