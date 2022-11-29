import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { newsProviders } from './news.provider';

@Module({
  providers: [NewsService, ...newsProviders],
  exports: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
