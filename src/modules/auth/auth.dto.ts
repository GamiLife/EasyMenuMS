import { Expose } from '@nestjs/class-transformer';
import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsDate,
} from 'class-validator';

/**
* Request on create auth
*/
export class AuthCreateDto {
    
    @IsNotEmpty()
    @IsString()
    readonly key: string;
    
    @IsNotEmpty()
    @IsString()
    readonly refreshKey: string;
    
    @IsNotEmpty()
    @IsDate()
    readonly expiry: Date;
    
    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;
}

/**
 * Request on response
 */
export class AuthResponseDto {
    
    @Expose()
    @IsString()
    readonly token: string

    @Expose()
    @IsString()
    readonly refreshToken: string

    @Expose()
    @IsString()
    readonly expiry: number
};