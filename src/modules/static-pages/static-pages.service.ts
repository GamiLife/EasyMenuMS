import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { STATIC_PAGES_REPOSITORY } from 'src/core/constants';
import { MetaDomain } from 'src/core/domain';
import { DBError, EmptyError } from 'src/core/exceptions';
import { MetaFactory } from 'src/core/factories';
import { BaseService } from 'src/core/services';
import { CompanyEntity } from '../companies/company.entity';
import { CompaniesService } from '../companies/company.service';
import { StaticPagesDomain } from './static-pages.domain';
import {
  GetStaticPagesByCompany,
  StaticPagesCreateDto,
  StaticPagesUpdateDto,
} from './static-pages.dto';
import { StaticPagesEntity } from './static-pages.entity';

@Injectable()
export class StaticPagesService extends BaseService {
  constructor(
    @Inject(STATIC_PAGES_REPOSITORY)
    private readonly staticPagesRepository: typeof StaticPagesEntity,
    private readonly companyService: CompaniesService
  ) {
    super(staticPagesRepository);
  }

  async create(staticPage: StaticPagesCreateDto): Promise<StaticPagesDomain> {
    await this.companyService.findOneById(staticPage.companyId);

    const staticPageEntity =
      await this.staticPagesRepository.create<StaticPagesEntity>(staticPage);

    if (!staticPageEntity) {
      throw new DBError('Static Page query failed', HttpStatus.BAD_REQUEST);
    }

    const staticPageDomain = plainToClass(StaticPagesDomain, staticPageEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return staticPageDomain;
  }

  async findOneById(id: number): Promise<StaticPagesDomain> {
    const staticPageEntity =
      await this.staticPagesRepository.findOne<StaticPagesEntity>({
        where: { id },
        include: [
          {
            model: CompanyEntity,
          },
        ],
      });

    if (!staticPageEntity) {
      throw new EmptyError('Static Page not found', HttpStatus.NOT_FOUND);
    }

    const staticPagesDomain = plainToClass(
      StaticPagesDomain,
      staticPageEntity,
      {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      }
    );

    return staticPagesDomain;
  }

  async findAllByCompanyId(
    companyId: number,
    pagination: GetStaticPagesByCompany
  ): Promise<MetaDomain<StaticPagesDomain[]>> {
    await this.companyService.findOneById(companyId);

    const filtersRepo = [
      {
        model: CompanyEntity,
        attributes: ['id'],
        required: true,
        where: {
          id: companyId,
        },
      },
    ];

    const staticPagesCounter = await this.count({
      filtersRepo,
      searchCol: 'name',
      search: pagination.search,
    });

    const staticPagesEntity = await this.pagination<StaticPagesEntity[]>({
      filtersRepo,
      pagination,
      searchCol: 'name',
    });

    const staticPageDomain = staticPagesEntity.map((locationEntity) =>
      plainToClass(StaticPagesDomain, locationEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    const metaResponse = MetaFactory.create<StaticPagesDomain[]>({
      pagination,
      totalItems: staticPagesCounter,
      data: staticPageDomain,
    });

    return metaResponse;
  }

  async update(
    staticPage: StaticPagesUpdateDto,
    id: number
  ): Promise<StaticPagesDomain> {
    await this.companyService.findOneById(staticPage.companyId);

    await this.staticPagesRepository
      .update(staticPage, {
        where: { id },
      })
      .catch((reason) => {
        throw new DBError(
          `StaticPage query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    const staticPageDomain = plainToClass(StaticPagesDomain, location, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return staticPageDomain;
  }
}
