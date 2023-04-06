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
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  MESSAGE_RESPONSE_CREATE_CATEGORY,
  MESSAGE_RESPONSE_GET_CATEGORY_ALL,
  MESSAGE_RESPONSE_GET_CATEGORY_BY_ID,
  MESSAGE_RESPONSE_UPDATE_CATEGORY,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import { S3Service } from 'src/core/services/S3.service';
import { CategoryPayloadValidation } from 'src/core/validations';
import {
  CategoryCreateDto,
  CategoryUpdateDto,
  GetCategoriesByCompany,
} from './categories.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoryService: CategoriesService,
    private s3Service: S3Service
  ) {}

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

  //ADD INTERCEPTOR TO VALIDATE IS NUMBER
  @Transform('CategoryResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_CATEGORY_BY_ID)
  @Get('companies/:companyId')
  async findAllByCompany(
    @Param('companyId') companyId,
    @Query() pagination: GetCategoriesByCompany
  ) {
    try {
      const categoryDomain = await this.categoryService.findAllByCompanyId(
        companyId,
        pagination
      );

      return {
        finalResponse: categoryDomain.data,
        metaData: categoryDomain.metaData,
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
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file,
    @Body(new CategoryPayloadValidation()) request: CategoryCreateDto
  ) {
    try {
      const fileResult = file?.originalname
        ? await this.s3Service.uploadFile(file.buffer, file.originalname)
        : null;

      const categoryDomain = await this.categoryService.create(
        request,
        fileResult?.fileUrl
      );

      return { finalResponse: categoryDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('CategoryResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_CATEGORY)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file,
    @Param('id') id,
    @Body(new CategoryPayloadValidation()) request: CategoryUpdateDto
  ) {
    try {
      const fileResult = file?.originalname
        ? await this.s3Service.uploadFile(file.buffer, file.originalname)
        : null;

      const categoryDomain = await this.categoryService.update(
        request,
        id,
        fileResult?.fileUrl
      );

      return { finalResponse: categoryDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
