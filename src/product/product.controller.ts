import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterQueryOptionsProduct } from './dto/filter.dto';
import { PaginateResult } from 'mongoose';
import { ProductDocument } from './entities/product.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/models/_user.model';
@ApiBearerAuth()
@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  findAll(
    @Query() queryFiltersAndOptions: FilterQueryOptionsProduct,

  ): Promise<PaginateResult<ProductDocument> | ProductDocument[]> {
    return this.productService.findAll(
      queryFiltersAndOptions
    )
  }

  @Roles(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
