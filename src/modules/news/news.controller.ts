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
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  MESSAGE_RESPONSE_CREATE_NEW,
  MESSAGE_RESPONSE_GET_NEW,
  MESSAGE_RESPONSE_GET_NEW_ALL,
  MESSAGE_RESPONSE_UPDATE_NEW,
} from "src/core/constants";
import { ResponseMessage, Transform } from "src/core/decorators";
import { CatchControl } from "src/core/exceptions";
import { S3Service } from "src/core/services/S3.service";
import { GetCategoriesByCompany } from "../categories/categories.dto";
import { NewCreateDto, NewUpdateDto } from "./news.dto";
import { NewsService } from "./news.service";

@Controller("news")
export class NewsController {
  constructor(
    private newService: NewsService,
    private readonly s3Service: S3Service
  ) {}

  @Transform("NewResponseDto")
  @ResponseMessage(MESSAGE_RESPONSE_GET_NEW_ALL)
  @Get("companies/:companyId")
  async findAllByCompanyId(
    @Param("companyId") companyId,
    @Query() pagination: GetCategoriesByCompany
  ) {
    try {
      const newsDomain = await this.newService.findAllByCompanyId(
        companyId,
        pagination
      );

      return {
        finalResponse: newsDomain.data,
        metaData: newsDomain.metadata,
      };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform("NewResponseDto")
  @ResponseMessage(MESSAGE_RESPONSE_GET_NEW_ALL)
  @Get()
  async findAll() {
    try {
      const newsDomain = await this.newService.findAll();

      return { finalResponse: newsDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform("NewResponseDto")
  @ResponseMessage(MESSAGE_RESPONSE_GET_NEW)
  @Get(":id")
  async findById(@Param("id") id) {
    try {
      const newDomain = await this.newService.findOneById(id);

      return { finalResponse: newDomain };
    } catch (error) {
      CatchControl(error);
    }
  }

  @Transform("NewResponseDto")
  @ResponseMessage(MESSAGE_RESPONSE_CREATE_NEW)
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(@UploadedFile() file, @Body() request: NewCreateDto) {
    try {
      const fileResult = await this.s3Service.uploadFile(
        file.buffer,
        file.originalname
      );
      const newDomain = await this.newService.create(
        request,
        fileResult.fileUrl
      );

      return { finalResponse: newDomain };
    } catch (error) {
      console.log("test", error);
      CatchControl(error);
    }
  }

  @Transform("NewResponseDto")
  @ResponseMessage(MESSAGE_RESPONSE_UPDATE_NEW)
  @Put(":id")
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @UploadedFile() file,
    @Param("id") id,
    @Body() request: NewUpdateDto
  ) {
    try {
      const fileResult = await this.s3Service.uploadFile(
        file.buffer,
        file.originalname
      );
      const newDomain = await this.newService.update(
        request,
        id,
        fileResult.fileUrl
      );

      return { finalResponse: newDomain };
    } catch (error) {
      CatchControl(error);
    }
  }
}
