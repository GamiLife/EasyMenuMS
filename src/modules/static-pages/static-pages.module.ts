import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { CompaniesModule } from '../companies/company.module';
import { StaticPagesController } from './static-pages.controller';
import { staticPagesProviders } from './static-pages.provider';
import { StaticPagesService } from './static-pages.service';

@Module({
  imports: [CoreModule, CompaniesModule],
  providers: [StaticPagesService, ...staticPagesProviders],
  exports: [StaticPagesService],
  controllers: [StaticPagesController],
})
export class StaticPagesModule {}
