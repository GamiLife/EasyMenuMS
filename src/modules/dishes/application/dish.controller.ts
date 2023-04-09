import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
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
import { GetShortInfoRequestDTO } from './dtos/get-short-dish-info.dto';
import { UpdateDishRequestDTO } from './dtos/update-dish.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/core/services/S3.service';

@Controller('dishes')
export class DishesController {
  constructor(private dishService: DishService, private s3Service: S3Service) {}

  //@Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH_ALL)
  @Get('byPagination')
  async geDishCollection(@Query() query: GetDishCollectionRequestDTO) {
    try {
      const response = await this.dishService.geDishCollection(query);

      return response;
    } catch (error) {
      CatchControl(error);
    }
  }

  //@Transform('DishDetailResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH)
  @Get('/short/:id')
  async getShortDishInfoById(
    @Param('id') id: number,
    @Query() query: GetShortInfoRequestDTO
  ) {
    try {
      const response = await this.dishService.getShortDishInfoById(query, id);

      return { data: response };
    } catch (error) {
      CatchControl(error);
    }
  }

  //@Transform('DishDetailResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH)
  @Get(':id')
  async getDishById(
    @Param('id') id: number,
    @Query() query: GetDishRequestDTO
  ) {
    try {
      const response = await this.dishService.getDishById(query, id);

      return { data: response };
    } catch (error) {
      console.log('test', error);
      CatchControl(error);
    }
  }

  //@Transform('DishDetailResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_DISH)
  @Get('slug/:slug')
  async getDishBySlug(
    @Param('slug') slug: string,
    @Query() query: GetDishRequestDTO
  ) {
    try {
      const response = await this.dishService.getDishBySlug(query, slug);

      return { data: response };
    } catch (error) {
      CatchControl(error);
    }
  }

  //@Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_DISH)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file, @Body() request: CreateDishRequestDTO) {
    try {
      const fileResult = file?.originalname
        ? await this.s3Service.uploadFile(file.buffer, file.originalname)
        : null;

      const response = await this.dishService.create(
        request,
        fileResult?.fileUrl
      );

      return { data: response };
    } catch (error) {
      CatchControl(error);
    }
  }

  //@Transform('DishResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_DISH)
  @Put('/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file,
    @Param('id') id: number,
    @Body() request: UpdateDishRequestDTO
  ) {
    try {
      const fileResult = file?.originalname
        ? await this.s3Service.uploadFile(file.buffer, file.originalname)
        : null;

      const response = await this.dishService.update(
        request,
        id,
        fileResult?.fileUrl
      );

      return { data: response };
    } catch (error) {
      CatchControl(error);
    }
  }
}
