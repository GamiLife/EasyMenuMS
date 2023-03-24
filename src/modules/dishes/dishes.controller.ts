import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  MESSAGE_RESPONSE_CREATE_DISH,
  MESSAGE_RESPONSE_GET_DISH,
  MESSAGE_RESPONSE_GET_DISH_ALL,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import { DishPayloadCreateDto, GetDishesByCategory } from './dtos';
import { DishesService } from './services';

@Controller('dishes')
export class DishesController {
  constructor(private dishesService: DishesService) {}

  @Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH_ALL)
  @Get('byPagination')
  async findAllByPagination(@Query() query: GetDishesByCategory) {
    try {
      const dishesDomain = await this.dishesService.findAllByPagination(query);

      return {
        finalResponse: dishesDomain.data,
        metaData: dishesDomain.metadata,
      };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH_ALL)
  @Get()
  async findAll() {
    try {
      const dishesDomain = await this.dishesService.findAll();

      return { finalResponse: dishesDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  //@Transform('DishGetResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH)
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug) {
    try {
      const dishDomain = await this.dishesService.findOneBySlug(slug);

      return { data: dishDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  //@Transform('DishDetailResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH)
  @Get(':id')
  async findById(@Param('id') id) {
    try {
      const dishResponse = await this.dishesService.findOneById(id);

      return { data: dishResponse };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_DISH)
  @Post()
  async create(@Body() newToAdd: DishPayloadCreateDto) {
    try {
      const dishDomain = await this.dishesService.create(newToAdd);

      return { finalResponse: dishDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
