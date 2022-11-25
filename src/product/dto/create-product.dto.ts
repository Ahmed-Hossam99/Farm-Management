import { ApiHideProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsOptional, IsString, IsNumber, IsEnum, isMongoId, IsNotEmpty, IsDate } from 'class-validator';

export class CreateProductDto {


  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  numberOfAcres?: number;

  @IsMongoId()
  department: string

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsBoolean()
  @IsOptional()
  @ApiHideProperty()
  enabled?: boolean;

}

