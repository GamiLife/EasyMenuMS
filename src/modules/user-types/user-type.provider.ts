import { UserTypeEntity } from './user-type.entity';
import { USER_TYPE_REPOSITORY } from '../../core/constants';

export const userTypesProviders = [
  {
    provide: USER_TYPE_REPOSITORY,
    useValue: UserTypeEntity,
  },
];
