import { Module } from '@nestjs/common';
import {
  DishesService,
  DishesDishesService,
  DishesSaucesService,
  DishesMainService,
} from './services';
import { DishesController } from './dishes.controller';
import { dishesProviders } from './dishes.provider';

@Module({
  providers: [
    DishesService,
    DishesDishesService,
    DishesSaucesService,
    DishesMainService,
    ...dishesProviders,
  ],
  exports: [
    DishesService,
    DishesDishesService,
    DishesSaucesService,
    DishesMainService,
  ],
  controllers: [DishesController],
})
export class DishesModule {}
