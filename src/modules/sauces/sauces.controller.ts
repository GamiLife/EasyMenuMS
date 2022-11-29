import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SauceCreateDto, SauceUpdateDto } from './sauces.dto';
import { SaucesService } from './sauces.service';

@Controller('sauces')
export class SaucesController {
  constructor(private sauceService: SaucesService) {}

  @Get()
  async findAll() {
    return await this.sauceService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.sauceService.findOneById(id);
  }

  @Post()
  async create(@Body() newToAdd: SauceCreateDto) {
    return await this.sauceService.create(newToAdd);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() newToUpdate: SauceUpdateDto) {
    return await this.sauceService.update(newToUpdate, id);
  }
}
