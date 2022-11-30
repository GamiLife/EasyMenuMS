import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DishPayloadCreateDto } from './dtos';
import { DishesMainService } from './services';

@Controller('dishes')
export class DishesController {
  constructor(private dishesMainService: DishesMainService) {}

  @Get()
  async findAll() {
    return await this.dishesMainService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.dishesMainService.findOneById(id);
  }

  @Post()
  async create(@Body() newToAdd: DishPayloadCreateDto) {
    return await this.dishesMainService.create(newToAdd);
  }
}
