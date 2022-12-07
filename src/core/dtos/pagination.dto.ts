import { Expose } from '@nestjs/class-transformer';
import { IsNumber, Min } from 'class-validator';

/**
 * Create Dish Request
 */
export class PaginationPayload {
  @Expose()
  @Min(1, { message: 'Min lenght should be one' })
  @IsNumber()
  page: number;
  @Expose()
  @Min(1, { message: 'Min lenght should be one' })
  @IsNumber()
  sizeByPage: number;
}

interface IPaginationDto {
  page: number;
  totalItems: number;
  sizeByPage: number;
}

/**
 * Payload Response
 */
export class PaginationDto {
  @Expose()
  @IsNumber()
  page: number;
  @Expose()
  @IsNumber()
  sizeByPage: number;
  @Expose()
  @IsNumber()
  totalPages: number;
  @Expose()
  @IsNumber()
  totalItems: number;
  @Expose()
  @IsNumber()
  hasPreviousPage: boolean;
  @Expose()
  @IsNumber()
  hasNextPage: boolean;

  constructor({ page, totalItems, sizeByPage }: IPaginationDto) {
    this.page = page;
    this.sizeByPage = sizeByPage;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / sizeByPage);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.totalPages;
  }
}
