import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NewCreateDto, NewUpdateDto } from './news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newService: NewsService) {}

  @Get()
  async findAll() {
    return await this.newService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.newService.findOneById(id);
  }

  @Post()
  async create(@Body() newToAdd: NewCreateDto) {
    return await this.newService.create(newToAdd);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() newToUpdate: NewUpdateDto) {
    return await this.newService.update(newToUpdate, id);
  }
}
