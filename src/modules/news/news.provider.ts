import { NewEntity } from './news.entity';
import { NEW_REPOSITORY } from '../../core/constants';

export const newsProviders = [
  {
    provide: NEW_REPOSITORY,
    useValue: NewEntity,
  },
];
