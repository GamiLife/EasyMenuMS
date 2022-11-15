import { Inject, Injectable } from '@nestjs/common';
import { COMPANY_REPOSITORY } from 'src/core/constants';
import { CompanyDto } from './company.dto';
import { Company } from './company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: typeof Company
  ) {}

  async create(company: CompanyDto): Promise<Company> {
    return await this.companyRepository.create<Company>(company);
  }

  async findOneById(id: number): Promise<Company> {
    return await this.companyRepository.findOne<Company>({ where: { id } });
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.findAll();
  }
}
