import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  MESSAGE_RESPONSE_CREATE_SAUCE,
  MESSAGE_RESPONSE_GET_SAUCE,
  MESSAGE_RESPONSE_GET_SAUCE_ALL,
  MESSAGE_RESPONSE_UPDATE_SAUCE,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import { SauceCreateDto, SauceUpdateDto } from './sauces.dto';
import { SaucesService } from './sauces.service';

@Controller('sauces')
export class SaucesController {
  constructor(private sauceService: SaucesService) {}

  @Transform('SauceResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_SAUCE_ALL)
  @Get()
  async findAll() {
    try {
      const saucesDomain = await this.sauceService.findAll();

      return { finalResponse: saucesDomain };
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
