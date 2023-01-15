import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CategoryPayloadValidation implements PipeTransform {
  transform(value: any, _: ArgumentMetadata) {
    const { iconId, file } = value;

    if (!iconId && !file) {
      throw new HttpException(
        'IconId field or ImageCategory must be filled at least one of them',
        HttpStatus.BAD_REQUEST
      );
    }

    return value;
  }
}
