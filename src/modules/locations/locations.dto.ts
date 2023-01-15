import { Expose } from '@nestjs/class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PaginationPayload } from 'src/core/dtos';

export class LocationFilters {}

/**
 * Get By Pagination Request
 */
export class GetLocationsByCompany extends PaginationPayload<LocationFilters> {}

/**
 * Request on create location
 */
export class LocationCreateDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  @MinLength(2, { message: 'Min length of name is 2 characters' })
  @IsString()
  readonly name: string;
  @IsNotEmpty({
    message: 'Address is required',
  })
  @IsString()
  readonly address: string;
  @IsNotEmpty({
    message: 'Phone is required',
  })
  @IsString()
  @MinLength(9, { message: 'This phone is not valid' })
  @MaxLength(20, { message: 'This phone is not valid' })
  readonly phone: string;
  @IsNumber()
  @Min(1)
  readonly companyId: number;
}

/**
 * Request on update location
 */
export class LocationUpdateDto {
  @Expose()
  @IsNotEmpty({
    message: 'Name is required',
  })
  @MinLength(2, { message: 'Min length of name is 2 characters' })
  @IsString()
  readonly name: string;
  @Expose()
  @IsNotEmpty({
    message: 'Address is required',
  })
  @IsString()
  readonly address: string;
  @Expose()
  @IsNotEmpty({
    message: 'Phone is required',
  })
  @IsString()
  @MinLength(9, { message: 'This phone is not valid' })
  @MaxLength(20, { message: 'This phone is not valid' })
  readonly phone: string;
  @Expose()
  @IsNumber()
  @Min(1)
  readonly companyId: number;
}

/**
 * LocationDto
 */
export class LocationResponseDto {
  @Expose()
  readonly id: number;
  @Expose()
  readonly name: string;
  @Expose()
  readonly address: string;
  @Expose()
  readonly phone: string;
  @Expose()
  readonly companyId: number;
}
