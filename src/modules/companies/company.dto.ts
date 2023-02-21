import { Expose, Type } from '@nestjs/class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsSlug } from 'src/core/decorators';
import { FnValidator } from 'src/core/decorators/custom-validator.decorator';
import { hasUniqueSocialNetworks } from 'src/core/helpers';
import { StaticPagesDomain } from '../static-pages/static-pages.domain';
import {
  BrandSocialNetworksCreateDto,
  BrandSocialNetworksUpdateDto,
} from './modules/brand-social-networks/brand-social-network.dto';
import { BrandDomain } from './modules/brand/brand.domain';
import { BrandCreateDto, BrandUpdateDto } from './modules/brand/brand.dto';
import { LogoProviderDomain } from './modules/logo-provider/logo-provider.domain';
import { SocialNetworkDomain } from './modules/social-networks/social-network.domain';
import { ThemeProviderDomain } from './modules/theme-provider/theme-provider.domain';
import {
  ThemeProviderCreateDto,
  ThemeProviderUpdateDto,
} from './modules/theme-provider/theme-provider.dto';

/**
 * Request on create company
 */
export class CompanyCreateDto {
  @Expose()
  readonly id?: number;
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
 * Request on create company
 */
export class CompanyUpdateDto {
  @Expose()
  readonly id?: number;
  @Expose()
  @IsNotEmpty({ message: 'Name required' })
  @MinLength(2, { message: 'Min length of name is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'This name is not valid' })
  readonly name: string;
  @Expose()
  @IsString()
  readonly description: string;
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

/**Create DTO */
export class CompanyDetailsCreateDto {
  @Expose()
  readonly company: CompanyCreateDto;
  @Expose()
  readonly brand: BrandCreateDto;
  @Expose()
  @Type(() => ThemeProviderCreateDto)
  readonly theme: ThemeProviderCreateDto[];
  @Expose()
  @Type(() => BrandSocialNetworksCreateDto)
  @FnValidator(hasUniqueSocialNetworks)
  readonly brandSocialNetworks: BrandSocialNetworksCreateDto[];
}

/**Create DTO */
export class CompanyDetailsUpdateDto {
  @Expose()
  readonly company: CompanyUpdateDto;
  @Expose()
  readonly brand: BrandUpdateDto;
  @Expose()
  @Type(() => ThemeProviderUpdateDto)
  readonly theme: ThemeProviderUpdateDto[];
  @Expose()
  @Type(() => BrandSocialNetworksUpdateDto)
  @FnValidator(hasUniqueSocialNetworks)
  readonly brandSocialNetworks: BrandSocialNetworksUpdateDto[];
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
