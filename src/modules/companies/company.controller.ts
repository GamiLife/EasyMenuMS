import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CompaniesService } from './company.service';
import {
  CompanyDetailsCreateDto,
  CompanyDetailsUpdateDto,
} from './company.dto';
import {
  MESSAGE_RESPONSE_CREATE_COMPANY,
  MESSAGE_RESPONSE_GET_COMPANY,
  MESSAGE_RESPONSE_GET_COMPANY_ALL,
  MESSAGE_RESPONSE_GET_COMPANY_BY_SLUG,
  MESSAGE_RESPONSE_UPDATE_COMPANY,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import { ThemeProviderUpdateBlockDto, ThemeProviderUpdateDto } from './modules/theme-provider/theme-provider.dto';

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

  @Transform('CompanyDetailsResponseDto')
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

  @Transform('CompanyDetailsResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_COMPANY_BY_SLUG)
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug) {
    try {
      const companyDomain = await this.companyService.findOneBySlugUrl(slug);

      return { finalResponse: companyDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('CompanyDetailsCreateDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_COMPANY)
  @Post()
  async create(@Body() request: CompanyDetailsCreateDto) {
    try {
      const companyDomain = await this.companyService.create(request);

      return { finalResponse: companyDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('CompanyDetailsUpdateDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_COMPANY)
  @Put(':id')
  async update(@Param('id') id, @Body() request: CompanyDetailsUpdateDto) {
    try {
      const companyDomain = await this.companyService.update(request, id);

      return { finalResponse: companyDomain };
    } catch (error) {
      console.log('test', error);
      CatchControl(error);
    }
  }

  @Transform('ThemeProviderResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_COMPANY)
  @Put(':id/blocks/:blockId')
  async updateBlockForTheme(
    @Param('id') id,
    @Param('blockId') blockId,
    @Body() request: ThemeProviderUpdateBlockDto
  ) {
    try {
      const blockDomain = await this.companyService.updateBlockId(
        blockId,
        request
      );

      return { finalResponse: blockDomain };
    } catch (error) {
      console.log('test', error);
      CatchControl(error);
    }
  }
}
