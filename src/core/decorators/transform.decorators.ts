import { SetMetadata } from '@nestjs/common';

export const TransformKey = 'TransformKey';
export const Transform = <T>(classToTransform: T) =>
  SetMetadata(TransformKey, classToTransform);
