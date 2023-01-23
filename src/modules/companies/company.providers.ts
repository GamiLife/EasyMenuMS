import { CompanyEntity } from './company.entity';
import {
  BRAND_REPOSITORY,
  COMPANY_REPOSITORY,
  COMPANY_SERVICE,
} from '../../core/constants';
import { CompaniesService } from './company.service';
import { BrandEntity } from './modules/brand/brand.entity';

export const companiesProviders = [
  {
    provide: COMPANY_REPOSITORY,
    useValue: CompanyEntity,
  },
  {
    provide: BRAND_REPOSITORY,
    useValue: BrandEntity,
  },

  {
    provide: COMPANY_SERVICE,
    useValue: CompaniesService,
  },
];
