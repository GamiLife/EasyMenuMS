import { Module } from '@nestjs/common';
import { companiesProviders } from './companies.providers';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';

@Module({
  providers: [CompaniesService, ...companiesProviders],
  exports: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
