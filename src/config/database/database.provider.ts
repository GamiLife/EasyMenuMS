/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from 'sequelize-typescript';
import { CategoryEntity } from 'src/modules/categories/categories.entity';
import { CompanyEntity } from 'src/modules/companies/company.entity';
import {
  DishDishesEntity,
  DishEntity,
  DishSauceEntity,
} from 'src/modules/dishes/entities';
import { LocationsEntity } from 'src/modules/locations/locations.entity';
import { NewEntity } from 'src/modules/news/news.entity';
import { SauceEntity } from 'src/modules/sauces/sauces.entity';
import { StaticPagesEntity } from 'src/modules/static-pages/static-pages.entity';
import { UserTypeEntity } from 'src/modules/user-types/user-type.entity';
import { UserEntity } from 'src/modules/users/users.entity';
import { SEQUELIZE } from '../../core/constants';
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
        SauceEntity,
        DishEntity,
        DishDishesEntity,
        DishSauceEntity,
        LocationsEntity,
        StaticPagesEntity,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
