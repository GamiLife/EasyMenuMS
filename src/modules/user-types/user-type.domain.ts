import { Expose } from '@nestjs/class-transformer';
import { IsString, MaxLength, IsNumber } from 'class-validator';
import { AggregateRoot } from 'src/core/domain';

export interface IUserTypeProps {
  name: string;
  description: string;
}

/**
 * Category Domain
 */
export class UserTypeDomainV2 {
  @Expose()
  @IsNumber()
  id: number;
  @Expose()
  @IsString()
  @MaxLength(150, { message: 'This name is not valid' })
  name: string;
  @Expose()
  @IsString()
  description: string;
}

export class UserTypeDomain extends AggregateRoot<IUserTypeProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }
}
