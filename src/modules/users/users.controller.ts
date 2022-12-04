import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  MESSAGE_RESPONSE_CREATE_USER,
  MESSAGE_RESPONSE_GET_USER,
  MESSAGE_RESPONSE_GET_USER_ALL,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import { UserCreateDto, UserUpdateDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Transform('UserResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_USER_ALL)
  @Get()
  async findAll() {
    try {
      const usersDomain = await this.userService.findAll();

      return { finalResponse: usersDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('UserResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_USER)
  @Get(':id')
  async findById(@Param('id') id) {
    try {
      const userDomain = await this.userService.findOneById(id);

      return { finalResponse: userDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('UserResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_USER)
  @Post()
  async create(@Body() user: UserCreateDto) {
    try {
      const userDomain = await this.userService.create(user);

      return { finalResponse: userDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('UserResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_USER)
  @Put(':id')
  async update(@Param('id') id, @Body() user: UserUpdateDto) {
    try {
      const userDomain = await this.userService.update(user, id);

      return { finalResponse: userDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
