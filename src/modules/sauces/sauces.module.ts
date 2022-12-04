import { Module } from '@nestjs/common';
import { SaucesService } from './sauces.service';
import { SaucesController } from './sauces.controller';
import { saucesProviders } from './sauces.provider';
import { CoreModule } from 'src/core/core.module';
import { CompaniesModule } from '../companies/company.module';

@Module({
  imports: [CoreModule, CompaniesModule],
  providers: [SaucesService, ...saucesProviders],
  exports: [SaucesService],
  controllers: [SaucesController],
})
export class SaucesModule {}
