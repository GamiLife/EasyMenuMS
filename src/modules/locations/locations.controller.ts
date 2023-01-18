import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  MESSAGE_RESPONSE_CREATE_LOCATION,
  MESSAGE_RESPONSE_GET_LOCATION_ALL,
  MESSAGE_RESPONSE_GET_LOCATION_BY_ID,
  MESSAGE_RESPONSE_UPDATE_LOCATION,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import {
  GetLocationsByCompany,
  LocationCreateDto,
  LocationUpdateDto,
} from './locations.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  //ADD INTERCEPTOR TO VALIDATE IS NUMBER
  @Transform('LocationResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_LOCATION_ALL)
  @Get('companies/:companyId')
  async findAllByCompany(
    @Param('companyId') companyId,
    @Query() pagination: GetLocationsByCompany
  ) {
    try {
      const locationDomain = await this.locationsService.findAllByCompanyId(
        companyId,
        pagination
      );

      return {
        finalResponse: locationDomain.data,
        metaData: locationDomain.metadata,
      };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('LocationResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_LOCATION_BY_ID)
  @Get(':id')
  async findById(@Param('id') id) {
    try {
      const categoryDomain = await this.locationsService.findOneById(id);

      return { finalResponse: categoryDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('LocationResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_LOCATION)
  @Post()
  async create(@Body() request: LocationCreateDto) {
    try {
      const categoryDomain = await this.locationsService.create(request);

      return { finalResponse: categoryDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('LocationResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_LOCATION)
  @Put(':id')
  async update(@Param('id') id, @Body() request: LocationUpdateDto) {
    try {
      const categoryDomain = await this.locationsService.update(request, id);

      return { finalResponse: categoryDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
