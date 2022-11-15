import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { UserTypesModule } from './modules/user-types/user-types.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CompaniesModule,
    UserTypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
