import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  MESSAGE_RESPONSE_CREATE_NEW,
  MESSAGE_RESPONSE_GET_NEW,
  MESSAGE_RESPONSE_GET_NEW_ALL,
  MESSAGE_RESPONSE_UPDATE_NEW,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import { NewCreateDto, NewUpdateDto } from './news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newService: NewsService) {}

  @Transform('NewResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_NEW_ALL)
  @Get()
  async findAll() {
    try {
      const newsDomain = await this.newService.findAll();

      return { finalResponse: newsDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('NewResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_NEW)
  @Get(':id')
  async findById(@Param('id') id) {
    try {
      const newDomain = await this.newService.findOneById(id);

      return { finalResponse: newDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('NewResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_NEW)
  @Post()
  async create(@Body() request: NewCreateDto) {
    try {
      const newDomain = await this.newService.create(request);

      return { finalResponse: newDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('NewResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_NEW)
  @Put(':id')
  async update(@Param('id') id, @Body() request: NewUpdateDto) {
    try {
      const newDomain = await this.newService.update(request, id);

      return { finalResponse: newDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
