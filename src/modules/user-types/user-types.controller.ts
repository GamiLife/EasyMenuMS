import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserTypeCreateDto, UserTypeUpdateDto } from './user-type.dto';
import { UserTypesService } from './user-types.service';

@Controller('user-types')
export class UserTypesController {
  constructor(private companyService: UserTypesService) {}

  @Get()
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.companyService.findOneById(id);
  }

  @Post()
  async create(@Body() company: UserTypeCreateDto) {
    return await this.companyService.create(company);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() company: UserTypeUpdateDto) {
    return await this.companyService.update(company, id);
  }
}
