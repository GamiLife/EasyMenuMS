import { Module } from '@nestjs/common';
import { CombosController } from './application/combos.controller';
import { ComboService } from './application/combos.service';
import { CoreModule } from 'src/core/core.module';
import { ComboRepository } from './infraestructure/db/combo.repository';
import { combosProviders } from './combo.provider';

@Module({
  imports: [CoreModule],
  providers: [ComboService, ComboRepository, ...combosProviders],
  exports: [ComboService],
  controllers: [CombosController],
})
export class CombosModule {}
