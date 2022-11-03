import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { DepartmentService } from 'src/department/department.service';
import { UserDocument } from 'src/users/models/_user.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { FilterQueryOptionsPayment } from './dto/filter.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentRepository } from './payment.repository';
var ObjectId = require('mongodb').ObjectId;

@Injectable()
export class PaymentService {


  constructor(
    // @Inject(forwardRef(() => TasksService))
    private readonly departmentService: DepartmentService,
    private readonly paymentRepository: PaymentRepository,


  ) { }
  async create(createPaymentDto: CreatePaymentDto) {

    return await this.paymentRepository.create(createPaymentDto as any);
  }

  async createExpensis(createPaymentDto: CreatePaymentDto) {
    let task = await this.departmentService.findOne(createPaymentDto.department);
    return await this.paymentRepository.create(createPaymentDto as any);
  }
  async findAll(
    FilterQueryOptionsTasks: FilterQueryOptionsPayment,
    @AuthUser() me: UserDocument,
  ) {
    return await this.paymentRepository.findAllWithPaginationCustome(
      me,
      FilterQueryOptionsTasks,
      // ['university', 'subject', 'state', 'teamMember', 'nameAr', 'nameEn'],
      // { populate: ['group', 'university'] },
    );
  }


  async totalMony(department: string) {
    console.log('here');

    let paidPriceEx = await this.paymentRepository.allExpensisMony(department);
    let paidPriceRev = await this.paymentRepository.allRevenueMony(department);

    //  if(paidPriceRev == undefined) paidPriceRev.totalRevenue = 0
    //  if(paidPriceEx== undefined) paidPriceEx.totalExpensis = 0
    // let finalRev = paidPriceRev.totalRevenue == undefined ? 0 : paidPriceRev.totalRevenue
    // let finalEx = paidPriceRev == undefined ? 0 : paidPriceRev.totalExpensis
    console.log('paidPriceEx')
    console.log(paidPriceEx)
    console.log('paidPriceRev')
    console.log(paidPriceRev)
    return {
      totalExpensis: paidPriceEx,
      totalRevenue: paidPriceRev,

    };
  }

  async totalMonyApp() {
    console.log('here');

    let paidPriceEx = await this.paymentRepository.allExpensisMonyApp();
    let paidPriceRev = await this.paymentRepository.allRevenueMonyApp();

    let profit = paidPriceRev - paidPriceEx

    return {
      totalExpensis: paidPriceEx,
      totalRevenue: paidPriceRev,
      profit
    };
  }


  async findAndUpdateMany(departId: string) {
    return await this.paymentRepository.updateManyPayment(departId);
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
