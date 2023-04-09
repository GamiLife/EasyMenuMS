import { SAUCE_REPOSITORY } from '../../core/constants';
import { SauceModel } from './sauces.entity';

export const saucesProviders = [
  {
    provide: SAUCE_REPOSITORY,
    useValue: SauceModel,
  },
];
