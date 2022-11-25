
import {
  Prop,
  Schema,
  SchemaFactory,
  DiscriminatorOptions,
  raw,
} from '@nestjs/mongoose';
import { Document, Model, ObjectId, Mongoose } from 'mongoose';
import { UserRole } from 'src/users/models/_user.model';
import { Constants } from '../../utils/constants';
export type DepartmentDocument = Department & Document;
@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
    transform: (_, doc: Record<string, unknown>) => {
      delete doc.__v;
      delete doc._id;
      return {
        ...doc,
      };
    },
  },
})
export class Department {

  id?: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Boolean, default: true })
  enabled: boolean;
}

const DepartmentSchema = SchemaFactory.createForClass(Department);



export { DepartmentSchema };

