import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  MESSAGE_RESPONSE_CREATE_DISH,
  MESSAGE_RESPONSE_GET_DISH,
  MESSAGE_RESPONSE_GET_DISH_ALL,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import { DishPayloadCreateDto, PayloadPagination } from './dtos';
import { DishesMainService } from './services';

@Controller('dishes')
export class DishesController {
  constructor(private dishesMainService: DishesMainService) {}

  @Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH_ALL)
  @Post('/:categoryId')
  async findAllByCategoryId(
    @Param('categoryId') categoryId,
    @Body() pagination: PayloadPagination
  ) {
    try {
      const dishesDomain = await this.dishesMainService.findAllByCategoryId(
        categoryId,
        pagination
      );

      return { finalResponse: dishesDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH_ALL)
  @Get()
  async findAll() {
    try {
      const dishesDomain = await this.dishesMainService.findAll();

      return { finalResponse: dishesDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH)
  @Get(':id')
  async findById(@Param('id') id) {
    try {
      const dishDomain = await this.dishesMainService.findOneById(id);

      return { finalResponse: dishDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_DISH)
  @Post()
  async create(@Body() newToAdd: DishPayloadCreateDto) {
    try {
      const dishDomain = await this.dishesMainService.create(newToAdd);

      return { finalResponse: dishDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
