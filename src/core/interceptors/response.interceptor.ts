import { plainToClass } from '@nestjs/class-transformer';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isArray } from 'class-validator';
import { Observable, map } from 'rxjs';
import { dtosInMetadata } from '../constants';
import { ResponseMessageKey, TransformKey } from '../decorators';
import { Response } from '../dtos';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const responseMessage =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
      '';
    const ClassToTransform = this.reflector.get<string>(
      TransformKey,
      context.getHandler()
    );

    return next.handle().pipe(
      map((data) => {
        if (!responseMessage) return data;
        if (!ClassToTransform) return data;

        const Class = dtosInMetadata[ClassToTransform];
        if (!Class) return data;

        const { finalResponse, metaData } = data;
        if (!finalResponse) return data;

        const converter = (item) =>
          plainToClass(Class, item, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
          });
        const isArrayResponse = isArray(finalResponse);
        const responseTransformed = isArrayResponse
          ? finalResponse.map((item) => converter(item))
          : converter(finalResponse);

        return {
          data: responseTransformed,
          metaData,
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: responseMessage,
        };
      })
    );
  }
}
