import { LOCATION_REPOSITORY } from 'src/core/constants';
import { LocationsEntity } from './locations.entity';

export const locationsProvider = [
  {
    provide: LOCATION_REPOSITORY,
    useValue: LocationsEntity,
  },
];
