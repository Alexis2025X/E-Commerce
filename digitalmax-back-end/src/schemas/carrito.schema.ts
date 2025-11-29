import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
@Schema({
    timestamps:true
})
export class carrito extends Document{
            @Prop({
            required:true, trim:true
            })
  idProducto: string;
  @Prop({
    required: true,
    default: 1,
  })
  cantSelect: number;
}

export const CarritoUserShecma = SchemaFactory.createForClass(carrito);
