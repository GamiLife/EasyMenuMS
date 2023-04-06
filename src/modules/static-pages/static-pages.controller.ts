import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  MESSAGE_RESPONSE_CREATE_STATIC_PAGE,
  MESSAGE_RESPONSE_GET_STATIC_PAGE_ALL,
  MESSAGE_RESPONSE_GET_STATIC_PAGE_BY_ID,
  MESSAGE_RESPONSE_UPDATE_STATIC_PAGE,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import {
  GetStaticPagesByCompany,
  StaticPagesCreateDto,
} from './static-pages.dto';
import { StaticPagesService } from './static-pages.service';

@Controller('static-pages')
export class StaticPagesController {
  constructor(private staticPagesService: StaticPagesService) {}

  //ADD INTERCEPTOR TO VALIDATE IS NUMBER
  @Transform('StaticPagesResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_STATIC_PAGE_ALL)
  @Get('companies/:companyId')
  async findAllByCompany(
    @Param('companyId') companyId,
    @Query() pagination: GetStaticPagesByCompany
  ) {
    try {
      const locationDomain = await this.staticPagesService.findAllByCompanyId(
        companyId,
        pagination
      );

      return {
        finalResponse: locationDomain.data,
        metaData: locationDomain.metaData,
      };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('StaticPagesResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_STATIC_PAGE_BY_ID)
  @Get(':id')
  async findById(@Param('id') id) {
    try {
      const staticPage = await this.staticPagesService.findOneById(id);

      return { finalResponse: staticPage };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('StaticPagesResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_STATIC_PAGE)
  @Post()
  async create(@Body() request: StaticPagesCreateDto) {
    try {
      const staticPageDomain = await this.staticPagesService.create(request);

      return { finalResponse: staticPageDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('StaticPagesResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_STATIC_PAGE)
  @Put(':id')
  async update(@Param('id') id, @Body() request: StaticPagesCreateDto) {
    try {
      const staticPageDomain = await this.staticPagesService.update(
        request,
        id
      );

      return { finalResponse: staticPageDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
