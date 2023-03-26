import { Module } from '@nestjs/common';
import { dishesProviders } from './dishes.provider';
import { CoreModule } from 'src/core/core.module';
import { DishService } from './application/dish.service';
import { DishesController } from './application/dish.controller';
import { DishRepository } from './infraestructure/db/dish.repository';

@Module({
  imports: [CoreModule],
  providers: [DishService, DishRepository, ...dishesProviders],
  exports: [DishService],
  controllers: [DishesController],
})
export class DishesModule {}
