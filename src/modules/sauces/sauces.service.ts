import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SAUCE_REPOSITORY } from 'src/core/constants';
import { DBError, EmptyError } from 'src/core/exceptions';
import { CompanyEntity } from '../companies/company.entity';
import { CompaniesService } from '../companies/company.service';
import { SauceDomainV2 } from './sauces.domain';
import { SauceCreateDto, SauceUpdateDto } from './sauces.dto';
import { SauceEntity } from './sauces.entity';

@Injectable()
export class SaucesService {
  constructor(
    @Inject(SAUCE_REPOSITORY)
    private readonly sauceRepository: typeof SauceEntity,
    private readonly companyService: CompaniesService
  ) {}

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
