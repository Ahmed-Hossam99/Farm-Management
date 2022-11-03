import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import
{
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Constants } from 'src/utils/constants';

export class CreateEmpolyeeDto
{

    
  // @IsPositive()
  // @Max(100)
  // @Min(0)

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()    
  @IsPositive()
  @Min(0)
  sallary: number;
  
  @IsNumber()  
  @IsPositive()
  ResidencyNumber: number;
  
  @IsNumber()
  @IsPositive()
  @ApiHideProperty()
  @IsOptional()
  code: number;
  
  @IsString()
  @IsNotEmpty()
  qualification: string;
  
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  notes: string;

  @IsString()
  @IsOptional()
  @Matches(Constants.PHONE_REGX, { message: 'phone is invalid' })
  phone: string;

}
