import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserDocument } from 'src/users/models/_user.model';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Department, DepartmentDocument } from './entities/department.entity';


@Injectable()
export class DepartmentRepository extends BaseAbstractRepository<Department> {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {
    super(departmentModel);
  }
  
}
