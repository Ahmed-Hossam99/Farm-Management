import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { DepartmentRepository } from './department.repository';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { FilterQueryOptionsDepartment } from './dto/filter.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentDocument } from './entities/department.entity';
var ObjectId = require('mongodb').ObjectId;
@Injectable()
export class DepartmentService {


  constructor(private readonly departmentRepository: DepartmentRepository) { }

  async create(createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentRepository.create(createDepartmentDto as any)
  }


  async findAll(
    queryFiltersAndOptions: FilterQueryOptionsDepartment,
  ): Promise<PaginateResult<DepartmentDocument> | DepartmentDocument[]> {
    const universities =
      await this.departmentRepository.findAllWithPaginationOption(
        queryFiltersAndOptions,
        ['name'],
      );
    return universities;
  }

  async findOne(id: string) {    
    console.log(id)
    let doc = await this.departmentRepository.findOne({ _id: ObjectId(id) })
    if (!doc) throw new BadRequestException('Department not found!!')
    return doc
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return await this.departmentRepository.updateOne({ _id: ObjectId(id) }, updateDepartmentDto);
  }

  async remove(id: string) {
    return await this.departmentRepository.deleteOne({ id })

  }
}
