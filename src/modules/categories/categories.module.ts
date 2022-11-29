import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { categoriesProviders } from './categories.provider';

@Module({
  providers: [CategoriesService, ...categoriesProviders],
  exports: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
