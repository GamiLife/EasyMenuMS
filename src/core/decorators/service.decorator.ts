import { SetMetadata } from '@nestjs/common';

export const ServiceCustomKey = 'ServiceCustomKey';
export const ServiceCustom = (message: string) =>
  SetMetadata(ServiceCustomKey, message);
