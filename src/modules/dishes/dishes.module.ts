import { Module } from '@nestjs/common';
import {
  DishesService,
  DishesDishesService,
  DishesSaucesService,
  DishesMainService,
} from './services';
import { DishesController } from './dishes.controller';
import { dishesProviders } from './dishes.provider';
import { CoreModule } from 'src/core/core.module';
import { SaucesModule } from '../sauces/sauces.module';

@Module({
  imports: [CoreModule, SaucesModule],
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
