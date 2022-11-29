import { Module } from '@nestjs/common';
import { userTypesProviders } from './user-type.provider';
import { UserTypesController } from './user-types.controller';
import { UserTypesService } from './user-types.service';

@Module({
  providers: [UserTypesService, ...userTypesProviders],
  exports: [UserTypesService],
  controllers: [UserTypesController],
})
export class UserTypesModule {}
