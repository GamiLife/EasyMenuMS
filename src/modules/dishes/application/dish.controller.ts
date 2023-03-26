import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  MESSAGE_RESPONSE_CREATE_DISH,
  MESSAGE_RESPONSE_GET_DISH,
  MESSAGE_RESPONSE_GET_DISH_ALL,
  MESSAGE_RESPONSE_UPDATE_DISH,
} from 'src/core/constants';
import { ResponseMessage } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import { DishService } from './dish.service';
import { GetDishRequestDTO } from './dtos';
import { CreateDishRequestDTO } from './dtos/create-dish.dto';
import { GetDishCollectionRequestDTO } from './dtos/get-collection.dto';
import { UpdateDishRequestDTO } from './dtos/update-dish.dto';

@Controller('dishes')
export class DishesController {
  constructor(private dishService: DishService) {}

  //@Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH_ALL)
  @Get('byPagination')
  async geDishCollection(@Query() query: GetDishCollectionRequestDTO) {
    try {
      const response = await this.dishService.geDishCollection(query);

      return {
        finalResponse: response,
      };
    } catch (error) {
      CatchControl(error);
    }
  }

  //@Transform('DishDetailResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH)
  @Get(':id')
  async findById(@Param('id') id, @Query() query: GetDishRequestDTO) {
    try {
      const response = await this.dishService.getDish(query, id);

      return { data: response };
    } catch (error) {
      console.log('test', error);
      CatchControl(error);
    }
  }

  //@Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_DISH)
  @Post()
  async create(@Body() request: CreateDishRequestDTO) {
    try {
      const response = await this.dishService.create(request);

      return { data: response };
    } catch (error) {
      CatchControl(error);
    }
  }

  //@Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_DISH)
  @Put('/:id')
  async update(@Param('id') id: number, @Body() request: UpdateDishRequestDTO) {
    try {
      const response = await this.dishService.update(request, id);

      return { data: response };
    } catch (error) {
      CatchControl(error);
    }
  }
}
