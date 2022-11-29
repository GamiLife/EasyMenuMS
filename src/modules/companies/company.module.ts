import { Module } from '@nestjs/common';
import { companiesProviders } from './company.providers';
import { CompaniesService } from './company.service';
import { CompaniesController } from './company.controller';

@Module({
  providers: [CompaniesService, ...companiesProviders],
  exports: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
