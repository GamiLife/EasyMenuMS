import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CompaniesService } from './company.service';
import { CompanyCreateDto, CompanyUpdateDto } from './company.dto';
import {
  MESSAGE_RESPONSE_CREATE_COMPANY,
  MESSAGE_RESPONSE_GET_COMPANY,
  MESSAGE_RESPONSE_GET_COMPANY_ALL,
  MESSAGE_RESPONSE_UPDATE_COMPANY,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';

@Controller('companies')
export class CompaniesController {
  constructor(private companyService: CompaniesService) {}

  @Transform('CompanyResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_COMPANY_ALL)
  @Get()
  async findAll() {
    try {
      const companiesDomain = await this.companyService.findAll();

      return { finalResponse: companiesDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('CompanyResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_COMPANY)
  @Get(':id')
  async findById(@Param('id') id) {
    try {
      const companyDomain = await this.companyService.findOneById(id);

      return { finalResponse: companyDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('CompanyResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_COMPANY)
  @Post()
  async create(@Body() request: CompanyCreateDto) {
    try {
      const companyDomain = await this.companyService.create(request);

      return { finalResponse: companyDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('CompanyResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_COMPANY)
  @Put(':id')
  async update(@Param('id') id, @Body() request: CompanyUpdateDto) {
    try {
      const companyDomain = await this.companyService.update(request, id);

      return { finalResponse: companyDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
