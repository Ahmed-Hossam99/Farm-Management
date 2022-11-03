import { IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import
{
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { PaymentType } from '../entities/payment.entity';

export class FilterQueryPayment
{
  @IsOptional()
  @IsMongoId()
  department?: string;

  @IsOptional()
  from?: string;

  @IsOptional()
  to?: string;

  @IsOptional()
  @IsEnum(PaymentType)
  paymentType?: PaymentType;

  @IsOptional()
  // @Transform(({ obj }) => {
  //   return JSON.parse(obj.isDeletedPayment);
  // })
  isDeletedPayment?: string;
}

export class FilterQueryOptionsPayment extends IntersectionType(
  FilterQueryPayment,
  PaginationParams,
) { }
