import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ComboService } from './combos.service';
import {
  CreateComboRequestDTO,
  GetComboCollectionRequestDTO,
  GetComboRequestDTO,
  UpdateComboRequestDTO,
} from './dtos';

@Controller('combos')
export class CombosController {
  constructor(private comboService: ComboService) {}

  @Get(':id')
  async getComboById(
    @Query() req: GetComboRequestDTO,
    @Param('id') id: number
  ) {
    try {
      const data = await this.comboService.getComboById(req, id);

      return { data };
    } catch (error) {
      console.log('test', error);
    }
  }

  @Get()
  async geComboCollection(@Query() query: GetComboCollectionRequestDTO) {
    try {
      const response = await this.comboService.geComboCollection(query);

      return response;
    } catch (error) {
      console.log('test', error);
      //CatchControl(error);
    }
  }

  @Post()
  async create(@Body() req: CreateComboRequestDTO) {
    try {
      const data = await this.comboService.create(req);

      return { data };
    } catch (error) {
      console.log('test', error);
    }
  }

  @Put(':id')
  async update(@Body() req: UpdateComboRequestDTO, @Param('id') id: number) {
    try {
      const data = await this.comboService.update(req, id);

      return { data };
    } catch (error) {
      console.log('test', error);
    }
  }
}
