import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BRAND_REPOSITORY, COMPANY_REPOSITORY } from 'src/core/constants';
import { DBError, EmptyError } from 'src/core/exceptions';
import { CompanyCreateDto, CompanyUpdateDto } from './company.dto';
import { CompanyDomainV2 } from './company.domain';
import { CompanyEntity } from './company.entity';
import { BrandEntity } from './modules/brand/brand.entity';
import { LogoProviderEntity } from './modules/logo-provider/logo-provider.entity';
import { ThemeProviderEntity } from './modules/theme-provider/theme-provider.entity';
import { SocialNetworkEntity } from './modules/social-networks/social-network.entity';
import { BrandDomain } from './modules/brand/brand.domain';
import { BrandSocialNetworkEntity } from './modules/brand-social-networks/brand-social-network.entity';
import { SocialNetworkDomain } from './modules/social-networks/social-network.domain';
import { LogoProviderDomain } from './modules/logo-provider/logo-provider.domain';
import { ThemeProviderDomain } from './modules/theme-provider/theme-provider.domain';
import { StaticPagesEntity } from '../static-pages/static-pages.entity';
import { StaticPagesDomain } from '../static-pages/static-pages.domain';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: typeof CompanyEntity,
    @Inject(BRAND_REPOSITORY)
    private readonly brandRepository: typeof BrandEntity
  ) {}

  async create(company: CompanyCreateDto): Promise<CompanyDomainV2> {
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

    const companyDomain = plainToClass(CompanyDomainV2, companyEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return companyDomain;
  }

  async findOneById(id: number): Promise<CompanyDomainV2> {
    const companyEntity = await this.companyRepository.findOne<CompanyEntity>({
      where: { id },
    });

    if (!companyEntity) {
      throw new EmptyError('Company not found', HttpStatus.NOT_FOUND);
    }

    const companyDomain = plainToClass(CompanyDomainV2, companyEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return companyDomain;
  }

  async findOneBySlugUrl(slugUrl: string): Promise<any> {
    const companyEntity = await this.companyRepository.findOne<CompanyEntity>({
      where: { slugUrl },
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
              model: LogoProviderEntity,
              required: true,
            },
            {
              through: {
                as: 'details',
              },
              model: SocialNetworkEntity,
              required: true,
            },
          ],
        },
        {
          model: StaticPagesEntity,
          required: true,
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
    company: CompanyUpdateDto,
    id: number
  ): Promise<CompanyDomainV2> {
    await this.companyRepository
      .update(company, {
        where: { id },
      })
      .catch((reason) => {
        throw new DBError(
          `Company query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    const companyDomain = plainToClass(CompanyDomainV2, company, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return companyDomain;
  }
}
