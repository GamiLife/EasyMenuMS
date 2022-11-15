import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompanyDto } from './company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private companyService: CompaniesService) {}

  @Get()
  async findAll() {
    return await this.companyService.findAll();
  }

  @Post()
  async create(@Body() company: CompanyDto) {
    return await this.companyService.create(company);
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.companyService.findOneById(id);
  }
}
