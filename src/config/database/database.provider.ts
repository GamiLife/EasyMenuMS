/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from 'sequelize-typescript';
import { CategoryEntity } from 'src/modules/categories/categories.entity';
import { CompanyEntity } from 'src/modules/companies/company.entity';
import { BrandSocialNetworkEntity } from 'src/modules/companies/modules/brand-social-networks/brand-social-network.entity';
import { BrandEntity } from 'src/modules/companies/modules/brand/brand.entity';
import { LogoProviderEntity } from 'src/modules/companies/modules/logo-provider/logo-provider.entity';
import { SocialNetworkEntity } from 'src/modules/companies/modules/social-networks/social-network.entity';
import { ThemeProviderEntity } from 'src/modules/companies/modules/theme-provider/theme-provider.entity';

import { DishModel } from 'src/modules/dishes/infraestructure/db/dish.model';
import { LocationsEntity } from 'src/modules/locations/locations.entity';
import { NewEntity } from 'src/modules/news/news.entity';
import { StaticPagesEntity } from 'src/modules/static-pages/static-pages.entity';
import { UserTypeEntity } from 'src/modules/user-types/user-type.entity';
import { UserEntity } from 'src/modules/users/users.entity';
import { SEQUELIZE } from '../../core/constants';
import { SauceModel } from 'src/modules/sauces/sauces.entity';
import { CombosModel } from 'src/modules/combos/infraestructure/db/combos.model';
import { ComboDishesModel } from 'src/modules/combos/infraestructure/db/combo-dishes.model';
import { ComboSauceModel } from 'src/modules/combos/infraestructure/db/combo-sauces.model';
const config = require('./database.config');

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        CompanyEntity,
        UserTypeEntity,
        UserEntity,
        NewEntity,
        CategoryEntity,
        SauceModel,
        DishModel,
        CombosModel,
        ComboDishesModel,
        ComboSauceModel,
        LocationsEntity,
        StaticPagesEntity,
        BrandEntity,
        SocialNetworkEntity,
        LogoProviderEntity,
        ThemeProviderEntity,
        BrandSocialNetworkEntity,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
