import {
    Prop,
    Schema,
    SchemaFactory,
    DiscriminatorOptions,
    raw,
} from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema, Document } from 'mongoose';
import { Department, DepartmentDocument } from 'src/department/entities/department.entity';

export type ProductDocument = Product & Document;



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
export class Product {

    id?: string;

    @Prop({ type: String })
    name: string;

    @Prop({ type: Number })
    numberOfAcres: number;

    @Prop({ type: Date, required: true })
    startDate?: Date;
  
    @Prop({ type: Date, required: true })
    endDate?: Date;
  
   
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: Department.name,
        required: true,
    })
    department: string | DepartmentDocument

}

const ProductSchema = SchemaFactory.createForClass(Product);



export { ProductSchema };
