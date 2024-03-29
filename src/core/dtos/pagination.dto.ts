import { Expose } from '@nestjs/class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { FilteringPayload } from './filtering.dto';

/**
 * Create Dish Request
 */
export class PaginationPayload<T> extends FilteringPayload<T> {
  @Expose()
  @IsOptional()
  page?: number;
  @Expose()
  @IsOptional()
  sizeByPage?: number;
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
