import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { newsProviders } from './news.provider';
import { CoreModule } from 'src/core/core.module';
import { CompaniesModule } from '../companies/company.module';

@Module({
  imports: [CoreModule, CompaniesModule],
  providers: [NewsService, ...newsProviders],
  exports: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
