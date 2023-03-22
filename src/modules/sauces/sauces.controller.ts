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
import { FileInterceptor } from '@nestjs/platform-express';
import {
  MESSAGE_RESPONSE_CREATE_SAUCE,
  MESSAGE_RESPONSE_GET_SAUCE,
  MESSAGE_RESPONSE_GET_SAUCE_ALL,
  MESSAGE_RESPONSE_UPDATE_SAUCE,
} from 'src/core/constants';
import { ResponseMessage, Transform } from 'src/core/decorators';
import { CatchControl } from 'src/core/exceptions';
import { S3Service } from 'src/core/services/S3.service';
import { GetLocationsByCompany } from '../locations/locations.dto';
import { SauceCreateDto, SauceUpdateDto } from './sauces.dto';
import { SaucesService } from './sauces.service';

@Controller('sauces')
export class SaucesController {
  constructor(
    private sauceService: SaucesService,
    private s3Service: S3Service
  ) {}

  @Transform('SauceResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_SAUCE_ALL)
  @Get('companies/:companyId')
  async findAllByCompany(
    @Param('companyId') companyId,
    @Query() pagination: GetLocationsByCompany
  ) {
    try {
      const saucesDomain = await this.sauceService.findAllByCompanyId(
        companyId,
        pagination
      );

      return {
        finalResponse: saucesDomain.data,
        metaData: saucesDomain.metadata,
      };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('SauceResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_GET_SAUCE)
  @Get(':id')
  async findById(@Param('id') id) {
    try {
      const sauceDomain = await this.sauceService.findOneById(id);

      return { finalResponse: sauceDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('SauceResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_SAUCE)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file, @Body() request: SauceCreateDto) {
    try {
      const fileResult = file?.originalname
        ? await this.s3Service.uploadFile(file.buffer, file.originalname)
        : null;
      const sauceDomain = await this.sauceService.create(
        request,
        fileResult?.fileUrl
      );

      return { finalResponse: sauceDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform('SauceResponseDto')
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_SAUCE)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file,
    @Param('id') id,
    @Body() newToUpdate: SauceUpdateDto
  ) {
    try {
      const fileResult = file?.originalname
        ? await this.s3Service.uploadFile(file.buffer, file.originalname)
        : null;

      const sauceDomain = await this.sauceService.update(
        newToUpdate,
        id,
        fileResult?.fileUrl
      );

      return { finalResponse: sauceDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
