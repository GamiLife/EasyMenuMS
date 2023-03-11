import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  MESSAGE_RESPONSE_CREATE_SAUCE,
  MESSAGE_RESPONSE_GET_SAUCE,
  MESSAGE_RESPONSE_GET_SAUCE_ALL,
  MESSAGE_RESPONSE_UPDATE_SAUCE,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import { GetLocationsByCompany } from '../locations/locations.dto';
import { SauceCreateDto, SauceUpdateDto } from './sauces.dto';
import { SaucesService } from './sauces.service';

@Controller('sauces')
export class SaucesController {
  constructor(private sauceService: SaucesService) {}

  @Transform('SauceResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_SAUCE_ALL)
  @Get('companies/:companyId')
  async findAllByCompany(
    @Param('companyId') companyId,
    @Query() pagination: GetLocationsByCompany
  ) {
    try {
      const saucesDomain = await this.sauceService.findAllByCompanyId(
        companyId,
        pagination
      );

      return {
        finalResponse: saucesDomain.data,
        metaData: saucesDomain.metadata,
      };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('SauceResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_SAUCE)
  @Get(':id')
  async findById(@Param('id') id) {
    try {
      const sauceDomain = await this.sauceService.findOneById(id);

      return { finalResponse: sauceDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('SauceResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_SAUCE)
  @Post()
  async create(@Body() request: SauceCreateDto) {
    try {
      const sauceDomain = await this.sauceService.create(request);

      return { finalResponse: sauceDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('SauceResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_SAUCE)
  @Put(':id')
  async update(@Param('id') id, @Body() newToUpdate: SauceUpdateDto) {
    try {
      const sauceDomain = await this.sauceService.update(newToUpdate, id);

      return { finalResponse: sauceDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
