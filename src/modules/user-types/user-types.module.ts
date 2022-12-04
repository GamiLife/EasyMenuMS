import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { CompaniesModule } from '../companies/company.module';
import { userTypesProviders } from './user-type.provider';
import { UserTypesController } from './user-types.controller';
import { UserTypesService } from './user-types.service';

@Module({
  imports: [CoreModule, CompaniesModule],
  providers: [UserTypesService, ...userTypesProviders],
  exports: [UserTypesService],
  controllers: [UserTypesController],
})
export class UserTypesModule {}
