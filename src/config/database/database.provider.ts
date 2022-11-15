import { Sequelize } from 'sequelize-typescript';
import { Company } from 'src/modules/companies/company.entity';
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
      sequelize.addModels([Company]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
