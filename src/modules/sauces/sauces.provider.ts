import { SauceEntity } from './sauces.entity';
import { SAUCE_REPOSITORY } from '../../core/constants';

export const saucesProviders = [
  {
    provide: SAUCE_REPOSITORY,
    useValue: SauceEntity,
  },
];
