import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CompaniesService } from './company.service';
import { CompanyCreateDto, CompanyUpdateDto } from './company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private companyService: CompaniesService) {}

  @Get()
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.companyService.findOneById(id);
  }

  @Post()
  async create(@Body() company: CompanyCreateDto) {
    return await this.companyService.create(company);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() company: CompanyUpdateDto) {
    return await this.companyService.update(company, id);
  }
}
