import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  MESSAGE_RESPONSE_CREATE_USERTYPE,
  MESSAGE_RESPONSE_GET_USERTYPE,
  MESSAGE_RESPONSE_GET_USERTYPE_ALL,
  MESSAGE_RESPONSE_UPDATE_USERTYPE,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import { UserTypeCreateDto, UserTypeUpdateDto } from './user-type.dto';
import { UserTypesService } from './user-types.service';

@Controller('user-types')
export class UserTypesController {
  constructor(private userTypeService: UserTypesService) {}

  @Transform('UserTypeResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_USERTYPE_ALL)
  @Get()
  async findAll() {
    try {
      const userTypeDomain = await this.userTypeService.findAll();

      return { finalResponse: userTypeDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('UserTypeResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_USERTYPE)
  @Get(':id')
  async findById(@Param('id') id) {
    try {
      const userTypeDomain = await this.userTypeService.findOneById(id);

      return { finalResponse: userTypeDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('UserTypeResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_USERTYPE)
  @Post()
  async create(@Body() company: UserTypeCreateDto) {
    try {
      const userTypeDomain = await this.userTypeService.create(company);

      return { finalResponse: userTypeDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('UserTypeResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_USERTYPE)
  @Put(':id')
  async update(@Param('id') id, @Body() company: UserTypeUpdateDto) {
    try {
      const userTypeDomain = await this.userTypeService.update(company, id);

      return { finalResponse: userTypeDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
