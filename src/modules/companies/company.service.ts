import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  BRANDSOCIALNETWORK_REPOSITORY,
  BRAND_REPOSITORY,
  COMPANY_REPOSITORY,
  THEMEPROVIDER_REPOSITORY,
} from 'src/core/constants';
import { DBError, EmptyError } from 'src/core/exceptions';
import {
  CompanyDetailsCreateDto,
  CompanyDetailsUpdateDto,
} from './company.dto';
import { CompanyDomainV2 } from './company.domain';
import { CompanyEntity } from './company.entity';
import { BrandEntity } from './modules/brand/brand.entity';
import { LogoProviderEntity } from './modules/logo-provider/logo-provider.entity';
import { ThemeProviderEntity } from './modules/theme-provider/theme-provider.entity';
import { SocialNetworkEntity } from './modules/social-networks/social-network.entity';
import { BrandDomain } from './modules/brand/brand.domain';
import { SocialNetworkDomain } from './modules/social-networks/social-network.domain';
import { LogoProviderDomain } from './modules/logo-provider/logo-provider.domain';
import { ThemeProviderDomain } from './modules/theme-provider/theme-provider.domain';
import { StaticPagesEntity } from '../static-pages/static-pages.entity';
import { StaticPagesDomain } from '../static-pages/static-pages.domain';
import { BrandSocialNetworkEntity } from './modules/brand-social-networks/brand-social-network.entity';
import { TEntityMixin } from 'src/core/types';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: typeof CompanyEntity,
    @Inject(BRAND_REPOSITORY)
    private readonly brandRepository: typeof BrandEntity,
    @Inject(THEMEPROVIDER_REPOSITORY)
    private readonly themeRepository: TEntityMixin<typeof ThemeProviderEntity>,
    @Inject(BRANDSOCIALNETWORK_REPOSITORY)
    private readonly brandSocialNetworksRepository: TEntityMixin<
      typeof BrandSocialNetworkEntity
    >
  ) {}

  async create(
    companyDetails: CompanyDetailsCreateDto
  ): Promise<CompanyDetailsCreateDto> {
    const company = companyDetails.company;
    const companyEntity = await this.companyRepository
      .create<CompanyEntity>(company)
      .catch((reason) => {
        throw new DBError(
          `Company query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    if (!companyEntity) {
      throw new DBError('Company query failed', HttpStatus.BAD_REQUEST);
    }

    const brand = { ...companyDetails.brand, companyId: companyEntity.id };
    const brandEntity = await this.brandRepository
      .create<BrandEntity>(brand)
      .catch((reason) => {
        throw new DBError(
          `Brand query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    if (!brandEntity) {
      throw new DBError('Brand query failed', HttpStatus.BAD_REQUEST);
    }

    const themes = companyDetails.theme.map((theme) => ({
      ...theme,
      brandId: Number(brandEntity.id),
    }));
    const themeEntities = [];
    for (const theme of themes) {
      const themeEntity = await this.themeRepository
        .create<ThemeProviderEntity>(theme)
        .catch((reason) => {
          throw new DBError(
            `Theme query failed: ${reason}`,
            HttpStatus.BAD_REQUEST
          );
        });
      themeEntities.push(themeEntity);
    }
    if (!themeEntities.length) {
      throw new DBError('Themes query failed', HttpStatus.BAD_REQUEST);
    }

    const brandSocialNetworks = companyDetails.brandSocialNetworks.map(
      (brandSocialNetwork) => ({
        ...brandSocialNetwork,
        brandId: Number(brandEntity.id),
      })
    );
    const brandSocialNetworkEntities = [];
    for (const brandSocialNetwork of brandSocialNetworks) {
      const brandSocialNetworkEntity = await this.brandSocialNetworksRepository
        .create<BrandSocialNetworkEntity>(brandSocialNetwork)
        .catch((reason) => {
          throw new DBError(
            `Brand Social Networks query failed: ${reason}`,
            HttpStatus.BAD_REQUEST
          );
        });
      brandSocialNetworkEntities.push(brandSocialNetworkEntity);
    }

    if (!brandSocialNetworkEntities.length) {
      throw new DBError(
        'Brand Social Networks query failed',
        HttpStatus.BAD_REQUEST
      );
    }

    return {
      ...companyDetails,
      company: {
        id: companyEntity.id,
        ...companyDetails.company,
      },
    };
  }

  private async findOneByField(name: string, value: string | number) {
    const companyEntity = await this.companyRepository.findOne<CompanyEntity>({
      where: { [name]: value },
      include: [
        {
          model: BrandEntity,
          required: true,
          include: [
            {
              model: ThemeProviderEntity,
              required: true,
            },
            {
              through: {
                as: 'details',
              },
              model: SocialNetworkEntity,
              required: true,
            },
            {
              model: LogoProviderEntity,
            },
          ],
        },
        {
          model: StaticPagesEntity,
          attributes: ['id', 'url'],
        },
      ],
    });

    if (!companyEntity) {
      throw new EmptyError('Company not found', HttpStatus.NOT_FOUND);
    }

    const companyDomain = plainToClass(CompanyDomainV2, companyEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
    const brandDomain = plainToClass(BrandDomain, companyEntity.brand, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    const staticPagesDomain = companyEntity.staticPages.map((staticPage) =>
      plainToClass(StaticPagesDomain, staticPage, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );
    const themesProviderDomain = companyEntity.brand.themeProviders.map(
      (themeItem) =>
        plainToClass(ThemeProviderDomain, themeItem, {
          excludeExtraneousValues: true,
          enableImplicitConversion: true,
        })
    );
    const logosProviderDomain = companyEntity.brand.logoProviders.map(
      (logoItem) =>
        plainToClass(LogoProviderDomain, logoItem, {
          excludeExtraneousValues: true,
          enableImplicitConversion: true,
        })
    );
    const socialNetworksDomain = companyEntity.brand.socialNetworks.map(
      (socialNetworkItem) =>
        plainToClass(SocialNetworkDomain, socialNetworkItem, {
          excludeExtraneousValues: true,
          enableImplicitConversion: true,
        })
    );

    const reponse = {
      company: companyDomain,
      brand: brandDomain,
      theme: themesProviderDomain,
      logos: logosProviderDomain,
      socialNetworks: socialNetworksDomain,
      staticPages: staticPagesDomain,
    };

    return reponse;
  }

  async findOneBySlugUrl(slugUrl: string): Promise<any> {
    return await this.findOneByField('slugUrl', slugUrl);
  }

  async findOneById(id: number): Promise<any> {
    return await this.findOneByField('id', id);
  }

  async findAll(): Promise<CompanyDomainV2[]> {
    const companiesEntity = await this.companyRepository.findAll({});

    const companiesDomain = companiesEntity.map((companyEntity) =>
      plainToClass(CompanyDomainV2, companyEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    return companiesDomain;
  }

  async update(
    companyDetails: CompanyDetailsUpdateDto,
    companyId: number
  ): Promise<CompanyDetailsUpdateDto> {
    const company = companyDetails.company;
    const companyEntity = await this.companyRepository
      .update<CompanyEntity>(company, {
        where: {
          id: companyId,
        },
      })
      .catch((reason) => {
        throw new DBError(
          `Company query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    if (!companyEntity) {
      throw new DBError('Company query failed', HttpStatus.BAD_REQUEST);
    }

    const brand = { ...companyDetails.brand, companyId: companyId };
    const brandEntity = await this.brandRepository
      .update<BrandEntity>(brand, {
        where: {
          id: brand.id,
        },
      })
      .catch((reason) => {
        throw new DBError(
          `Brand query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    if (!brandEntity) {
      throw new DBError('Brand query failed', HttpStatus.BAD_REQUEST);
    }

    const themes = companyDetails.theme.map((theme) => ({
      ...theme,
      brandId: Number(brand.id),
    }));
    const themeEntities = [];
    for (const theme of themes) {
      const themeEntity = await this.themeRepository
        .switchOperation(theme)
        .catch((reason) => {
          throw new DBError(
            `Theme query failed: ${reason}`,
            HttpStatus.BAD_REQUEST
          );
        });
      themeEntities.push(themeEntity);
    }
    if (!themeEntities.length) {
      throw new DBError('Themes operation failed', HttpStatus.BAD_REQUEST);
    }

    const brandSocialNetworks = companyDetails.brandSocialNetworks.map(
      (brandSocialNetwork) => ({
        ...brandSocialNetwork,
        brandId: Number(brand.id),
      })
    );
    const brandSocialNetworkEntities = [];
    for (const brandSocialNetwork of brandSocialNetworks) {
      const brandSocialNetworkEntity = await this.brandSocialNetworksRepository
        .switchOperation(brandSocialNetwork)
        .catch((reason) => {
          throw new DBError(
            `Brand Social Networks operation failed: ${reason}`,
            HttpStatus.BAD_REQUEST
          );
        });
      brandSocialNetworkEntities.push(brandSocialNetworkEntity);
    }

    if (!brandSocialNetworkEntities.length) {
      throw new DBError(
        'Brand Social Networks query failed',
        HttpStatus.BAD_REQUEST
      );
    }

    return {
      ...companyDetails,
      company: {
        id: companyId,
        ...companyDetails.company,
      },
    };
  }
}
