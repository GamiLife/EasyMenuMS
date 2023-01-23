import { Expose, Type } from '@nestjs/class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsSlug } from 'src/core/decorators';
import { StaticPagesDomain } from '../static-pages/static-pages.domain';
import { BrandDomain } from './modules/brand/brand.domain';
import { LogoProviderDomain } from './modules/logo-provider/logo-provider.domain';
import { SocialNetworkDomain } from './modules/social-networks/social-network.domain';
import { ThemeProviderDomain } from './modules/theme-provider/theme-provider.domain';

/**
 * Request on create company
 */
export class CompanyCreateDto {
  @IsNotEmpty({ message: 'Name required' })
  @MinLength(2, { message: 'Min length of name is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'This name is not valid' })
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsString()
  @IsSlug()
  readonly slugUrl: string;
}

/**
 * Request on create company
 */
export class CompanyUpdateDto {
  @Expose()
  @IsNotEmpty({ message: 'Name required' })
  @MinLength(2, { message: 'Min length of name is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'This name is not valid' })
  readonly name: string;
  @Expose()
  @IsString()
  readonly description: string;
  @Expose()
  @IsString()
  @IsSlug()
  readonly slugUrl: string;
}

/**
 * CompanyDto
 */
export class CompanyResponseDto {
  @Expose()
  @IsNumber()
  readonly id?: number;
  @Expose()
  @IsString()
  readonly name: string;
  @Expose()
  @IsString()
  readonly description: string;
  @Expose()
  @IsString()
  readonly slugUrl: string;
}

/**General Response DTO */
export class CompanyDetailsResponseDto {
  @Expose()
  readonly company: CompanyResponseDto;
  @Expose()
  @Type(() => BrandDomain)
  readonly brand: BrandDomain;
  @Expose()
  @Type(() => ThemeProviderDomain)
  readonly theme: ThemeProviderDomain[];
  @Expose()
  @Type(() => LogoProviderDomain)
  readonly logos: LogoProviderDomain[];
  @Expose()
  @Type(() => SocialNetworkDomain)
  readonly socialNetworks: SocialNetworkDomain[];
  @Expose()
  @Type(() => StaticPagesDomain)
  readonly staticPages: StaticPagesDomain[];
}
