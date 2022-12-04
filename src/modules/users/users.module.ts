import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';
import { UserTypesModule } from '../user-types/user-types.module';
import { CoreModule } from 'src/core/core.module';
import { CompaniesModule } from '../companies/company.module';

@Module({
  imports: [CoreModule, UserTypesModule, CompaniesModule],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
