
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';
import { Department } from 'src/department/entities/department.entity';
import { User } from 'src/users/models/_user.model';



export enum PaymentType {
  EXPENSIS = 'EXPENSIS',
  REVENUSE = 'REVENUSE',
}
export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  id?: string;

  @Prop({ type: String, enum: Object.values(PaymentType), required: true })
  paymentType: PaymentType;


  @Prop({ type: String })
  name: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Department.name,
    required: true,
  })
  department: string;

  @Prop({ type: Number, required: true })
  paid: number;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: Date, required: true })
  recieveTime: Date;

  @Prop({
    type: Boolean, default: false
  })
  isDeletedPayment?: boolean;

}

const PaymentSchema = SchemaFactory.createForClass(Payment);

export { PaymentSchema };
