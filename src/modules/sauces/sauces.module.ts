import { Module } from '@nestjs/common';
import { SaucesService } from './sauces.service';
import { SaucesController } from './sauces.controller';
import { saucesProviders } from './sauces.provider';

@Module({
  providers: [SaucesService, ...saucesProviders],
  exports: [SaucesService],
  controllers: [SaucesController],
})
export class SaucesModule {}
