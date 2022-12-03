import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { COMPANY_REPOSITORY } from 'src/core/constants';
import { EmptyError } from 'src/core/exceptions';
import {
  CompanyCreateDto,
  CompanyResponseDto,
  CompanyUpdateDto,
} from './company.dto';
import { CompanyEntity } from './company.entity';
import { CompanyMapper } from './company.mapper';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: typeof CompanyEntity
  ) {}

  async create(company: CompanyCreateDto): Promise<CompanyResponseDto> {
    const companyCreated = await this.companyRepository.create<CompanyEntity>(
      company
    );
    const companyDomain = CompanyMapper.entityToDomain(companyCreated);
    const companyResponse = CompanyMapper.domainToResponse(companyDomain);

    return companyResponse;
  }

  async findOneById(id: number): Promise<CompanyResponseDto> {
    const companyGet = await this.companyRepository.findOne<CompanyEntity>({
      where: { id },
    });

    if (!companyGet) {
      throw new EmptyError('Company not found', HttpStatus.NOT_FOUND);
    }

    const companyDomain = CompanyMapper.entityToDomain(companyGet);
    const companyResponse = CompanyMapper.domainToResponse(companyDomain);

    return companyResponse;
  }

  async findAll(): Promise<CompanyResponseDto[]> {
    const companies = await this.companyRepository.findAll();

    const companiesDomain = CompanyMapper.entitiesToDomains(companies);
    const companiesResponse = CompanyMapper.domainsToResponses(companiesDomain);

    return companiesResponse;
  }

  async update(
    company: CompanyUpdateDto,
    id: number
  ): Promise<CompanyResponseDto> {
    await this.companyRepository.update(company, {
      where: { id },
    });
    const companyDomain = CompanyMapper.updateDtoToDomain(company);
    const companyResponse = CompanyMapper.domainToResponse(companyDomain);

    return companyResponse;
  }
}
