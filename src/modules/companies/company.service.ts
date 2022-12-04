import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { COMPANY_REPOSITORY } from 'src/core/constants';
import { DBError, EmptyError } from 'src/core/exceptions';
import { CompanyCreateDto, CompanyUpdateDto } from './company.dto';
import { CompanyDomainV2 } from './company.domain';
import { CompanyEntity } from './company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: typeof CompanyEntity
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
