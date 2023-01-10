import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { BASE_SERVICE } from "./constants";
import { ResponseInterceptor } from "./interceptors";
import { BaseService } from "./services";
import { S3Service } from "./services/S3.service";

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
  providers: [BaseService, S3Service, ...providers],
  exports: [BaseService, S3Service],
})
export class CoreModule {}
