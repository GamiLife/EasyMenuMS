import {
  DISH_DISH_REPOSITORY,
  DISH_REPOSITORY,
  DISH_SAUCE_REPOSITORY,
  DISH_SERVCICE,
  DISH_DISH_SERVICE,
  DISH_SAUCE_SERVCICE,
} from '../../core/constants';
import { DishDishesEntity, DishSauceEntity, DishEntity } from './entities';
import {
  DishesDishesService,
  DishesSaucesService,
  DishesService,
} from './services';

export const dishesProviders = [
  {
    provide: DISH_REPOSITORY,
    useValue: DishEntity,
  },
  {
    provide: DISH_SAUCE_REPOSITORY,
    useValue: DishSauceEntity,
  },
  {
    provide: DISH_DISH_REPOSITORY,
    useValue: DishDishesEntity,
  },

  {
    provide: DISH_SERVCICE,
    useValue: DishesService,
  },
  {
    provide: DISH_SAUCE_SERVCICE,
    useValue: DishesSaucesService,
  },
  {
    provide: DISH_DISH_SERVICE,
    useValue: DishesDishesService,
  },
];
