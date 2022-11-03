import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './entities/payment.entity';
import { DepartmentModule } from 'src/department/department.module';
import { PaymentRepository } from './payment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
    ]),
    DepartmentModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService,PaymentRepository],
  exports: [PaymentService,PaymentRepository],
})
export class PaymentModule {}
