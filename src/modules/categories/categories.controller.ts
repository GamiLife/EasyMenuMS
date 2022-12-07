import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  MESSAGE_RESPONSE_CREATE_CATEGORY,
  MESSAGE_RESPONSE_GET_CATEGORY_ALL,
  MESSAGE_RESPONSE_GET_CATEGORY_BY_ID,
  MESSAGE_RESPONSE_UPDATE_CATEGORY,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import {
  CategoryCreateDto,
  CategoryUpdateDto,
  GetCategoriesByCompany,
} from './categories.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Transform('CategoryResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_CATEGORY_ALL)
  @Get()
  async findAll() {
    try {
      const categoriesDomain = await this.categoryService.findAll();

      return { finalResponse: categoriesDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('CategoryResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_CATEGORY_BY_ID)
  @Post('companies/:companyId')
  async findAllByCompany(
    @Param('companyId') companyId,
    @Body() pagination: GetCategoriesByCompany
  ) {
    try {
      const categoryDomain = await this.categoryService.findAllByCompanyId(
        companyId,
        pagination
      );

      return {
        finalResponse: categoryDomain.data,
        metaData: categoryDomain.metadata,
      };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('CategoryResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_CATEGORY_BY_ID)
  @Get(':id')
  async findById(@Param('id') id) {
    try {
      const categoryDomain = await this.categoryService.findOneById(id);

      return { finalResponse: categoryDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('CategoryResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_CATEGORY)
  @Post()
  async create(@Body() request: CategoryCreateDto) {
    try {
      const categoryDomain = await this.categoryService.create(request);

      return { finalResponse: categoryDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('CategoryResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_CATEGORY)
  @Put(':id')
  async update(@Param('id') id, @Body() request: CategoryUpdateDto) {
    try {
      const categoryDomain = await this.categoryService.update(request, id);

      return { finalResponse: categoryDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
