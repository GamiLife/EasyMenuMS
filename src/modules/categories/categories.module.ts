import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { categoriesProviders } from './categories.provider';
import { CoreModule } from 'src/core/core.module';
import { CompaniesModule } from '../companies/company.module';

@Module({
  imports: [CoreModule, CompaniesModule],
  providers: [CategoriesService, ...categoriesProviders],
  exports: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
