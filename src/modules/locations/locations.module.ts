import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { CompaniesModule } from '../companies/company.module';
import { LocationsController } from './locations.controller';
import { locationsProvider } from './locations.provider';
import { LocationsService } from './locations.service';

@Module({
  imports: [CoreModule, CompaniesModule],
  providers: [LocationsService, ...locationsProvider],
  exports: [LocationsService],
  controllers: [LocationsController],
})
export class LocationsModule {}
