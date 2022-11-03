import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/models/_user.model';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { FilterQueryOptionsDepartment } from './dto/filter.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentDocument } from './entities/department.entity';
@ApiBearerAuth()
@ApiTags('Departments')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(
    @Query() queryFiltersAndOptions: FilterQueryOptionsDepartment,
  ): Promise<PaginateResult<DepartmentDocument> | DepartmentDocument[]>
  {
    return await this.departmentService.findAll(queryFiltersAndOptions);
  }

  @Roles(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(id, updateDepartmentDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(id);
  }
}
