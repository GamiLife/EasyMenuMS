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
import { INJECT_JWT, dtosInMetadata } from '../constants';
import { ResponseMessageKey, TransformKey } from '../decorators';
import { Response } from '../dtos';
import { IJwtTokens } from '../interfaces/jwt-tokens.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
	constructor(private reflector: Reflector) {}
	
	intercept(
		context: ExecutionContext,
		next: CallHandler
	): Observable<Response<T>> {
		const responseMessage = this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ?? '';
		const ClassToTransform = this.reflector.get<string>(
			TransformKey,
			context.getHandler()
		);
		const injectJwt = this.reflector.get<boolean>(
			INJECT_JWT,
			context.getHandler()
		);

		let jwtTokens: IJwtTokens;
		let finalResponse: any;
		
		return next.handle().pipe(
			map((data) => {
				 

				if (!responseMessage) return data;
				if (!ClassToTransform) return data;
				
				const Class = dtosInMetadata[ClassToTransform];
				if (!Class) return data;
				
				const { finalResponse: prevFinalResponse, metaData } = data;
				if (!prevFinalResponse) return data;

				
				const converter = (item) =>
					plainToClass(Class, item, {
						excludeExtraneousValues: true,
						enableImplicitConversion: true,
				});
				const isArrayResponse = isArray(prevFinalResponse);

				if (!isArrayResponse && injectJwt) {
					const { token, refreshToken, expiry, ...rest} = prevFinalResponse;
					finalResponse = rest;
					jwtTokens = {
						token, 
						refreshToken,
						expiry: expiry.getTime()
					}
				} else {
					finalResponse = prevFinalResponse;
				}

				const responseTransformed = isArrayResponse
					? finalResponse.map((item) => converter(item))
					: converter(finalResponse);
				
				
				
				return {
					data: responseTransformed,
					metaData,
					statusCode: context.switchToHttp().getResponse().statusCode,
					message: responseMessage,
					...jwtTokens
				};
			})
		);
	}
}
		