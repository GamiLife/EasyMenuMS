import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { CompaniesModule } from './modules/companies/company.module';
import { UserTypesModule } from './modules/user-types/user-types.module';
import { UsersModule } from './modules/users/users.module';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CompaniesModule,
    UserTypesModule,
    UsersModule,
    NewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
