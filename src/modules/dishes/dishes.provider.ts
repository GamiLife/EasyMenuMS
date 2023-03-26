import { DishProviders } from './application/dish.constants';
import { DishService } from './application/dish.service';
import { DishModel } from './infraestructure/db/dish.model';
import { DishRepository } from './infraestructure/db/dish.repository';

export const dishesProviders = [
  {
    provide: DishProviders.Model,
    useValue: DishModel,
  },
  {
    provide: DishProviders.Repository,
    useValue: DishRepository,
  },
  {
    provide: DishProviders.Service,
    useValue: DishService,
  },
];
