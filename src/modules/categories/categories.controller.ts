import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryCreateDto, CategoryUpdateDto } from './categories.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.categoryService.findOneById(id);
  }

  @Post()
  async create(@Body() newToAdd: CategoryCreateDto) {
    return await this.categoryService.create(newToAdd);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() newToUpdate: CategoryUpdateDto) {
    return await this.categoryService.update(newToUpdate, id);
  }
}
