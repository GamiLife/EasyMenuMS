import { CategoryResponseDto } from 'src/modules/categories/categories.dto';
import {
  CompanyDetailsCreateDto,
  CompanyDetailsResponseDto,
  CompanyDetailsUpdateDto,
  CompanyResponseDto,
} from 'src/modules/companies/company.dto';
import { ThemeProviderResponseDto } from 'src/modules/companies/modules/theme-provider/theme-provider.dto';
import { DishGetResponseDto, DishResponseDto } from 'src/modules/dishes/dtos';
import { LocationResponseDto } from 'src/modules/locations/locations.dto';
import { NewResponseDto } from 'src/modules/news/news.dto';
import { SauceResponseDto } from 'src/modules/sauces/sauces.dto';
import { StaticPagesResponseDto } from 'src/modules/static-pages/static-pages.dto';
import { UserTypeResponseDto } from 'src/modules/user-types/user-type.dto';
import { UserResponseDto } from 'src/modules/users/users.dto';
export * from './message-decorators';

export const dtosInMetadata = {
  CategoryResponseDto: CategoryResponseDto,
  CompanyResponseDto: CompanyResponseDto,
  NewResponseDto: NewResponseDto,
  UserTypeResponseDto: UserTypeResponseDto,
  UserResponseDto: UserResponseDto,
  SauceResponseDto: SauceResponseDto,
  DishResponseDto: DishResponseDto,
  DishGetResponseDto: DishGetResponseDto,
  LocationResponseDto: LocationResponseDto,
  StaticPagesResponseDto: StaticPagesResponseDto,
  CompanyDetailsResponseDto: CompanyDetailsResponseDto,
  CompanyDetailsCreateDto: CompanyDetailsCreateDto,
  CompanyDetailsUpdateDto: CompanyDetailsUpdateDto,
  ThemeProviderResponseDto: ThemeProviderResponseDto,
};

export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';

export const COMPANY_REPOSITORY = 'COMPANY_REPOSITORY';
export const USER_TYPE_REPOSITORY = 'USER_TYPE_REPOSITORY';
export const USER_REPOSITORY = 'USER_REPOSITORY';
export const NEW_REPOSITORY = 'NEW_REPOSITORY';
export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';
export const SAUCE_REPOSITORY = 'SAUCE_REPOSITORY';
export const LOCATION_REPOSITORY = 'LOCATION_REPOSITORY';
export const STATIC_PAGES_REPOSITORY = 'STATIC_PAGES_REPOSITORY';
export const BRAND_REPOSITORY = 'BRAND_REPOSITORY';
export const LOGOPROVIDER_REPOSITORY = 'LOGOPROVIDER_REPOSITORY';
export const THEMEPROVIDER_REPOSITORY = 'THEMEPROVIDER_REPOSITORY';
export const BRANDSOCIALNETWORK_REPOSITORY = 'BRANDSOCIALNETWORK_REPOSITORY';

export const DISH_REPOSITORY = 'DISH_REPOSITORY';
export const DISH_SAUCE_REPOSITORY = 'DISH_SAUCE_REPOSITORY';
export const DISH_DISH_REPOSITORY = 'DISH_DISH_REPOSITORY';

export const DISH_SERVCICE = 'DISH_SERVCICE';
export const DISH_SAUCE_SERVCICE = 'DISH_SAUCE_SERVCICE';
export const DISH_DISH_SERVICE = 'DISH_DISH_SERVICE';

export const COMPANY_SERVICE = 'COMPANY_SERVICE';
export const BASE_SERVICE = 'BASE_SERVICE';
