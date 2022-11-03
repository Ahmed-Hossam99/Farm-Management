import { IsBoolean, IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeRegExp } from 'lodash';
import
{
  PaginationParams,
} from 'src/utils/pagination/paginationParams.dto';
import { IntersectionType } from '@nestjs/swagger';
// import { State } from 'src/tasks/models/task.model';
export class FilterQueryProduct
{
  
  @IsOptional()
  @Transform(({ obj }) =>
  {
    return new RegExp(escapeRegExp(obj.name), 'i');
  })
  name?: string;

  @IsOptional()
  @IsMongoId()
  department?:string

}
export class FilterQueryOptionsProduct extends IntersectionType(
    FilterQueryProduct,
  PaginationParams,
) { }