import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DepartmentModule } from 'src/department/department.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    DepartmentModule
  ],
  controllers: [ProductController],
  providers: [ProductService,ProductRepository],
  exports: [ProductService,ProductRepository],
})
export class ProductModule {}
