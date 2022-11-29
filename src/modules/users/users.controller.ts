import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.userService.findOneById(id);
  }

  @Post()
  async create(@Body() user: UserCreateDto) {
    return await this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() user: UserUpdateDto) {
    return await this.userService.update(user, id);
  }
}
