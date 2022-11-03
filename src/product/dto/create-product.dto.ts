import { IsBoolean, IsMongoId, IsOptional, IsString , IsNumber , IsEnum, isMongoId, IsNotEmpty, IsDate } from 'class-validator';

export class CreateProductDto {
    

    @IsString()
    @IsNotEmpty()
    name?: string;
  
    // @IsString()
    // nameEn?: string;
  
    @IsMongoId()
    department:string

    @IsDate()
    startDate: Date;
  
    @IsDate()
    endDate: Date;
 
  }
  
