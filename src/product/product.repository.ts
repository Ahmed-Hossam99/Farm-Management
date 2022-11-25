import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { UserDocument } from 'src/users/models/_user.model';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Product, ProductDocument } from './entities/product.entity';
var ObjectId = require('mongodb').ObjectId;
import * as _ from 'lodash';

@Injectable()
export class ProductRepository extends BaseAbstractRepository<Product> {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }


  public async findAllWithPaginationCustome(
    queryFiltersAndOptions: any,
  ): Promise<ProductDocument[]> {
    console.log(queryFiltersAndOptions)

    let filters: FilterQuery<ProductDocument> = _.pick(queryFiltersAndOptions, [
      'department',
      'name',
      'enabled',
    ]);
    console.log('here')
    const options: PaginateOptions = _.pick(queryFiltersAndOptions, [
      'page',
      'limit',
    ]);
    let query = {
      ...(queryFiltersAndOptions.enabled !== null &&
      // queryFiltersAndOptions.isDeletedPayment !== undefined &&
      {
        enabled: queryFiltersAndOptions.enabled
          == 'true' as any ?
          // true : false
          { $ne: false } : { $ne: true }
      }),

      ...(queryFiltersAndOptions.department && { department: ObjectId(queryFiltersAndOptions.department) }),

    }
    delete filters.department
    delete filters.enabled


    let docs;
    console.log(filters)
    console.log(query)
    if (queryFiltersAndOptions.allowPagination) {
      docs = await (this.productModel as PaginateModel<ProductDocument>).paginate(
        // here we can but any option to to query like sort
        {
          filters,
          ...query
        },
        {
          ...options,
          // populate: ['paymentType']
          populate: { path: 'department', select: ['name'] }
        }
      );
    } else {
      docs = await this.productModel.find({
        filters,
        ...query
      },)
        .populate({ path: 'department', select: ['name'] })
    }
    return docs;
  }

}
