import { ComboProviders } from './application/combo.constants';
import { ComboService } from './application/combos.service';
import { ComboDishesModel } from './infraestructure/db/combo-dishes.model';
import { ComboSauceModel } from './infraestructure/db/combo-sauces.model';
import { ComboRepository } from './infraestructure/db/combo.repository';
import { CombosModel } from './infraestructure/db/combos.model';

export const combosProviders = [
  {
    provide: ComboProviders.Model,
    useValue: CombosModel,
  },
  {
    provide: ComboProviders.ComboDishModel,
    useValue: ComboDishesModel,
  },
  {
    provide: ComboProviders.ComboSauceModel,
    useValue: ComboSauceModel,
  },
  {
    provide: ComboProviders.Repository,
    useValue: ComboRepository,
  },
  {
    provide: ComboProviders.Service,
    useValue: ComboService,
  },
];
