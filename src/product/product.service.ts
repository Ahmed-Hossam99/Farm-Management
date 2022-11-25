import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { DepartmentService } from 'src/department/department.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterQueryProduct } from './dto/filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './entities/product.entity';
import { ProductRepository } from './product.repository';
var ObjectId = require('mongodb').ObjectId;

@Injectable()
export class ProductService {

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly departmentService: DepartmentService
  ) { }



  async create(createProductDto: CreateProductDto) {

    //todo validate dept existance 
    let deptDoc = await this.departmentService.findOne(createProductDto.department)
    return await this.productRepository.create(createProductDto as any)

  }


  async findAll(
    queryFiltersAndOptions: FilterQueryProduct,
  ): Promise<PaginateResult<ProductDocument> | ProductDocument[]> {
    const universities =
      await this.productRepository.findAllWithPaginationCustome(
        queryFiltersAndOptions,
        // ['name', 'department'], { populate: { path: 'department', select: ['name'] } }
      );
    return universities;
  }

  async findOne(id: string) {
    console.log(id)
    let doc = await this.productRepository.findOne({ _id: id })
    // if (!doc) throw new BadRequestException('District not found!!')
    return doc
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    delete updateProductDto.department
    return await this.productRepository.updateOne({ _id: ObjectId(id) }, updateProductDto);
  }

  async remove(id: string) {
    return await this.productRepository.deleteOne({ id })

  }





}
