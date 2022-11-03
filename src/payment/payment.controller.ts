import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UserDocument, UserRole } from 'src/users/models/_user.model';
import { FilterQueryOptionsPayment } from './dto/filter.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaymentType } from './entities/payment.entity';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import ParamsWithId from 'src/utils/paramsWithId.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from 'src/department/department.service';
var ObjectId = require('mongodb').ObjectId;
@ApiBearerAuth()
@ApiTags('payments')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly departmentService: DepartmentService,

  ) { }


  @Roles(UserRole.ADMIN)
  @Post('/expensis/:id')
  async createExpensis(
    @Param('id') id: string,
    @Body() createPaymentDto: CreatePaymentDto
  ) {

    if (!createPaymentDto.name) throw new BadRequestException('name is required!!')
    delete createPaymentDto.quantity
    let doc = await this.departmentService.findOne(id)
    createPaymentDto.department = ObjectId(id)
    createPaymentDto.paymentType = PaymentType.EXPENSIS;
    return this.paymentService.createExpensis(createPaymentDto);
  }

  @Roles(UserRole.ADMIN)
  @Post('/revenue/:id')
  async createRevenue(
    @Param('id') id: string,
    @Body() createPaymentDto: CreatePaymentDto) {

    if (!createPaymentDto.quantity) throw new BadRequestException('quantity is required!!')
    let doc = await this.departmentService.findOne(id)
    createPaymentDto.department = ObjectId(id)
    delete createPaymentDto.name
    createPaymentDto.paymentType = PaymentType.REVENUSE;
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll(
    @Query() FilterQueryOptionsTasks: FilterQueryOptionsPayment,
    @AuthUser() me: UserDocument,
  ) {
    return this.paymentService.findAll(FilterQueryOptionsTasks, me);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Get(':department/all-payments')
  MonyTest(@Param('department') department: string) {
    return this.paymentService.totalMony(department);
  }

  @Get('/all/profits')
  MonyTest2() {
    return this.paymentService.totalMonyApp();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}


/*

{
    "data": [
        {
            "name": "building_wires",
            "products": [
                {
                    "id": 1,
                    "name": "cables",
                    "attribuites": [
                        {
                            "id": 1,
                            "name": "color",
                            "type": "list",
                            "values": [
                                {
                                    "id": 1,
                                    "name": "Red"
                                },
                                {
                                    "id": 1,
                                    "name": "Red"
                                },
                                {
                                    "id": 1,
                                    "name": "Red"
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "name": "size",
                            "type": "single",
                            "value": 12
                        }
                    ]
                },
                {
                    "id": 1,
                    "name": "wires",
                    "attribuites": [
                        {
                            "id": 1,
                            "name": "color",
                            "type": "list",
                            "values": [
                                {
                                    "id": 1,
                                    "name": "Red"
                                },
                                {
                                    "id": 1,
                                    "name": "Red"
                                },
                                {
                                    "id": 1,
                                    "name": "Red"
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "name": "size",
                            "type": "single",
                            "value": 12
                        }
                    ]
                }
            ]
        },
        {
            "name": "building_materials",
            "products": [
                {
                    "id": 1,
                    "name": "aaa",
                    "attribuites": [
                        {
                            "id": 1,
                            "name": "color",
                            "type": "list",
                            "values": [
                                {
                                    "id": 1,
                                    "name": "Red"
                                },
                                {
                                    "id": 1,
                                    "name": "Red"
                                },
                                {
                                    "id": 1,
                                    "name": "Red"
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "name": "size",
                            "type": "single",
                            "value": 12
                        }
                    ]
                },
                {
                    "id": 1,
                    "name": "sss",
                    "attribuites": [
                        {
                            "id": 1,
                            "name": "color",
                            "type": "list",
                            "values": [
                                {
                                    "id": 1,
                                    "name": "Red"
                                },
                                {
                                    "id": 1,
                                    "name": "Red"
                                },
                                {
                                    "id": 1,
                                    "name": "Red"
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "name": "size",
                            "type": "single",
                            "value": 12
                        }
                    ]
                }
            ]
        }
    ]
}
*/