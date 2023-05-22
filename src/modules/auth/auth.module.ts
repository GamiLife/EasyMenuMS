import { Module } from '@nestjs/common';
import { UserTypesModule } from '../user-types/user-types.module';
import { CoreModule } from 'src/core/core.module';
import { CompaniesModule } from '../companies/company.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { usersProviders } from '../users/users.provider';

@Module({
  imports: [CoreModule, UserTypesModule, CompaniesModule],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
