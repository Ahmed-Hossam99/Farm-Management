import { PartialType } from '@nestjs/swagger';
import { CreateEmpolyeeDto } from './createEmpolyee.dto';
// import { CreateUniversityDto } from './create-university.dto';

export class UpdateEmpolyeeDto extends PartialType(CreateEmpolyeeDto) { }
