import { Expose } from '@nestjs/class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { PaginationPayload } from 'src/core/dtos';

export enum EPageType {
  informative = 'informative',
  editable = 'editable',
}

export class StaticPagesFilters {}

/**
 * Get By Pagination Request
 */
export class GetStaticPagesByCompany extends PaginationPayload<StaticPagesFilters> {}

/**
 * Request on create location
 */
export class StaticPagesCreateDto {
  @Expose()
  @IsNotEmpty({
    message: 'Url is required',
  })
  readonly url: string;
  @Expose()
  @IsNotEmpty({
    message: 'HtmlContent is required',
  })
  readonly htmlContent: string;
  @Expose()
  @IsNotEmpty({
    message: 'CompanyId is required',
  })
  @IsNumber()
  @Min(1)
  readonly companyId: number;
  @Expose()
  @IsNotEmpty()
  @IsEnum(EPageType)
  readonly pageType: EPageType;
}

/**
 * Request on update location
 */
export class StaticPagesUpdateDto {
  @Expose()
  @IsNotEmpty({
    message: 'Url is required',
  })
  readonly url: string;
  @Expose()
  @IsNotEmpty({
    message: 'HtmlContent is required',
  })
  readonly htmlContent: string;
  @Expose()
  @IsNotEmpty({
    message: 'CompanyId is required',
  })
  @IsNumber()
  @Min(1)
  readonly companyId: number;
  @Expose()
  @IsNotEmpty()
  @IsEnum(EPageType)
  readonly pageType: EPageType;
}

/**
 * StaticPagesResponseDto
 */
export class StaticPagesResponseDto {
  @Expose()
  readonly url: string;
  @Expose()
  readonly htmlContent: string;
  @Expose()
  readonly companyId: number;
  @Expose()
  readonly pageType: EPageType;
}
