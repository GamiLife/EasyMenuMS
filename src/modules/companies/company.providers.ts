import { CompanyEntity } from './company.entity';
import { COMPANY_REPOSITORY, COMPANY_SERVICE } from '../../core/constants';
import { CompaniesService } from './company.service';

export const companiesProviders = [
  {
    provide: COMPANY_REPOSITORY,
    useValue: CompanyEntity,
  },

  {
    provide: COMPANY_SERVICE,
    useValue: CompaniesService,
  },
];
