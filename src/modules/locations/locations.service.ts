import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LOCATION_REPOSITORY } from 'src/core/constants';
import { MetaDomain } from 'src/core/domain';
import { DBError, EmptyError } from 'src/core/exceptions';
import { MetaFactory } from 'src/core/factories';
import { BaseService } from 'src/core/services';
import { CompanyEntity } from '../companies/company.entity';
import { CompaniesService } from '../companies/company.service';
import { LocationDomain } from './locations.domain';
import {
  GetLocationsByCompany,
  LocationCreateDto,
  LocationUpdateDto,
} from './locations.dto';
import { LocationsEntity } from './locations.entity';

@Injectable()
export class LocationsService extends BaseService {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationsRepository: typeof LocationsEntity,
    private readonly companyService: CompaniesService
  ) {
    super(locationsRepository);
  }

  async create(location: LocationCreateDto): Promise<LocationDomain> {
    await this.companyService.findOneById(location.companyId);

    const locationEntity =
      await this.locationsRepository.create<LocationsEntity>(location);

    if (!locationEntity) {
      throw new DBError('Location query failed', HttpStatus.BAD_REQUEST);
    }

    const locationDomain = plainToClass(LocationDomain, locationEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return locationDomain;
  }

  async findOneById(id: number): Promise<LocationDomain> {
    const locationGetEntity =
      await this.locationsRepository.findOne<LocationsEntity>({
        where: { id },
        include: [
          {
            model: CompanyEntity,
          },
        ],
      });

    if (!locationGetEntity) {
      throw new EmptyError('Location not found', HttpStatus.NOT_FOUND);
    }

    const locationDomain = plainToClass(LocationDomain, locationGetEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return locationDomain;
  }

  async findAllByCompanyId(
    companyId: number, 
    pagination: GetLocationsByCompany
  ): Promise<MetaDomain<LocationDomain[]>> {
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

    const locationsCounter = await this.count({
      filtersRepo,
      searchCol: 'name',
      search: pagination.search,
    });

    const locationsEntity = await this.pagination<LocationsEntity[]>({
      filtersRepo,
      pagination,
      searchCol: 'name',
    });

    const locationsDomain = locationsEntity.map((locationEntity) =>
      plainToClass(LocationDomain, locationEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    const metaResponse = MetaFactory.create<LocationDomain[]>({
      pagination,
      totalItems: locationsCounter,
      data: locationsDomain,
    });

    return metaResponse;
  }

  async update(
    location: LocationUpdateDto,
    id: number
  ): Promise<LocationDomain> {
    await this.companyService.findOneById(location.companyId);

    await this.locationsRepository
      .update(location, {
        where: { id },
      })
      .catch((reason) => {
        throw new DBError(
          `Location query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    const locationDomain = plainToClass(LocationDomain, location, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return locationDomain;
  }
}
