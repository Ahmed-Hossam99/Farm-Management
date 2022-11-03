import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './entities/department.entity';
import { DepartmentRepository } from './department.repository';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Department.name,
        schema: DepartmentSchema,
      },
    ]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService,DepartmentRepository],
  exports: [DepartmentService,DepartmentRepository],
})
export class DepartmentModule {}
