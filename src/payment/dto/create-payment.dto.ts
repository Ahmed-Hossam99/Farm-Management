
import { ApiHideProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentType } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsString()
  @IsEnum(PaymentType)
  @ApiHideProperty()
  @IsOptional()
  paymentType: PaymentType;

  @IsBoolean()
  @IsOptional()
  @ApiHideProperty()
  isDeletedPayment: boolean;

  @IsMongoId()
  @ApiHideProperty()
  @IsOptional()
  department: string;

  @IsMongoId()
  @ApiHideProperty()
  @IsOptional()
  product: string;

  @IsNumber()
  paid: number;


  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsDate()
  recieveTime: Date;
}
