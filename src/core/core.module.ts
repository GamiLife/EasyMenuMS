import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BASE_SERVICE } from './constants';
import { ResponseInterceptor } from './interceptors';
import { BaseService } from './services';

const providers = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
  {
    provide: BASE_SERVICE,
    useClass: BaseService,
  },
];

@Module({
  imports: [BaseService],
  providers: [BaseService, ...providers],
  exports: [BaseService],
})
export class CoreModule {}
