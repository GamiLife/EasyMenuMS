import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SAUCE_REPOSITORY } from 'src/core/constants';
import { MetaDomain } from 'src/core/domain';
import { DBError, EmptyError } from 'src/core/exceptions';
import { MetaFactory } from 'src/core/factories';
import { BaseService } from 'src/core/services';
import { CompanyEntity } from '../companies/company.entity';
import { CompaniesService } from '../companies/company.service';
import { SauceDomainV2 } from './sauces.domain';
import {
  GetSaucesByCompany,
  SauceCreateDto,
  SauceUpdateDto,
} from './sauces.dto';
import { SauceEntity } from './sauces.entity';

@Injectable()
export class SaucesService extends BaseService {
  constructor(
    @Inject(SAUCE_REPOSITORY)
    private readonly sauceRepository: typeof SauceEntity,
    private readonly companyService: CompaniesService
  ) {
    super(sauceRepository);
  }

  async create(sauce: SauceCreateDto): Promise<SauceDomainV2> {
    await this.companyService.findOneById(sauce.companyId);

    const sauceEntity = await this.sauceRepository
      .create<SauceEntity>(sauce)
      .catch((reason) => {
        throw new DBError(
          `Category query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    if (!sauceEntity) {
      throw new DBError('Sauce query failed', HttpStatus.BAD_REQUEST);
    }

    const sauceDomain = plainToClass(SauceDomainV2, sauceEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return sauceDomain;
  }

  async findAllByCompanyId(
    companyId: number,
    pagination: GetSaucesByCompany
  ): Promise<MetaDomain<SauceDomainV2[]>> {
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

    const saucesConter = await this.count({
      filtersRepo,
      searchCol: 'title',
      search: pagination.search,
    });

    const saucesEntity = await this.pagination<SauceEntity[]>({
      filtersRepo,
      pagination,
      searchCol: 'title',
    });

    const saucesDomain = saucesEntity.map((sauceEntity) =>
      plainToClass(SauceDomainV2, sauceEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    const metaResponse = MetaFactory.create<SauceDomainV2[]>({
      pagination,
      totalItems: saucesConter,
      data: saucesDomain,
    });

    return metaResponse;
  }

  async findOneById(id: number): Promise<SauceDomainV2> {
    const sauceGetEntity = await this.sauceRepository.findOne<SauceEntity>({
      where: { id },
      include: [
        {
          model: CompanyEntity,
        },
      ],
    });

    if (!sauceGetEntity) {
      throw new EmptyError('Sauce not found', HttpStatus.NOT_FOUND);
    }

    const sauceDomain = plainToClass(SauceDomainV2, sauceGetEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return sauceDomain;
  }

  async findAll(): Promise<SauceDomainV2[]> {
    const saucesEntity = await this.sauceRepository.findAll({
      include: [
        {
          model: CompanyEntity,
          attributes: ['id'],
          required: true,
        },
      ],
    });

    const saucesDomain = saucesEntity.map((sauceEntity) =>
      plainToClass(SauceDomainV2, sauceEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    return saucesDomain;
  }

  async update(
    sauceToUpdate: SauceUpdateDto,
    id: number
  ): Promise<SauceDomainV2> {
    await this.companyService.findOneById(sauceToUpdate.companyId);

    await this.sauceRepository
      .update(sauceToUpdate, {
        where: { id },
      })
      .catch((reason) => {
        throw new DBError(
          `Sauce query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    const categoryDomain = plainToClass(SauceDomainV2, sauceToUpdate, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return categoryDomain;
  }
}
