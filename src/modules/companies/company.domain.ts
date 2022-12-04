import { Expose } from '@nestjs/class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { AggregateRoot } from 'src/core/domain';

export interface ICompanyDomainProps {
  name: string;
  description: string;
}

/**
 * Company Domain
 */
export class CompanyDomainV2 {
  @Expose()
  @IsNumber()
  id: number;
  @Expose()
  @IsString()
  @MaxLength(150, { message: 'This title is not valid' })
  name: string;
  @Expose()
  @IsString()
  description: string;
}

export class CompanyDomain extends AggregateRoot<ICompanyDomainProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }
}
