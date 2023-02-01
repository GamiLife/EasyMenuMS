import { CompanyEntity } from './company.entity';
import {
  BRANDSOCIALNETWORK_REPOSITORY,
  BRAND_REPOSITORY,
  COMPANY_REPOSITORY,
  COMPANY_SERVICE,
  LOGOPROVIDER_REPOSITORY,
  THEMEPROVIDER_REPOSITORY,
} from '../../core/constants';
import { CompaniesService } from './company.service';
import { BrandEntity } from './modules/brand/brand.entity';
import { ThemeProviderEntity } from './modules/theme-provider/theme-provider.entity';
import { BrandSocialNetworkEntity } from './modules/brand-social-networks/brand-social-network.entity';
import { LogoProviderEntity } from './modules/logo-provider/logo-provider.entity';

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
    provide: THEMEPROVIDER_REPOSITORY,
    useValue: ThemeProviderEntity,
  },
  {
    provide: BRANDSOCIALNETWORK_REPOSITORY,
    useValue: BrandSocialNetworkEntity,
  },
  {
    provide: LOGOPROVIDER_REPOSITORY,
    useValue: LogoProviderEntity,
  },

  {
    provide: COMPANY_SERVICE,
    useValue: CompaniesService,
  },
];
