import { STATIC_PAGES_REPOSITORY } from 'src/core/constants';
import { StaticPagesEntity } from './static-pages.entity';

export const staticPagesProviders = [
  {
    provide: STATIC_PAGES_REPOSITORY,
    useValue: StaticPagesEntity,
  },
];
