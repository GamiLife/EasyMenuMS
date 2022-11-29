import { Sequelize } from 'sequelize-typescript';
import { CategoryEntity } from 'src/modules/categories/categories.entity';
import { CompanyEntity } from 'src/modules/companies/company.entity';
import { NewEntity } from 'src/modules/news/news.entity';
import { SauceEntity } from 'src/modules/sauces/sauces.entity';
import { UserTypeEntity } from 'src/modules/user-types/user-type.entity';
import { UserEntity } from 'src/modules/users/users.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../../core/constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        CompanyEntity,
        UserTypeEntity,
        UserEntity,
        NewEntity,
        CategoryEntity,
        SauceEntity,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
