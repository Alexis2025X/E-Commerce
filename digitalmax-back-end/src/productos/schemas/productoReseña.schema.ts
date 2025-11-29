import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
@Schema({
    timestamps:true
})
export class resena extends Document{
            @Prop({
            required:true, trim:true
            })
            userReseña: string;
            @Prop({
            required:true, trim:true
            })
            userNameReseña: string;
            @Prop({
            required:true, trim:true
            })
            titulo: string;
            @Prop({
            required:true, trim:true
            })
            descripcion: string;
            @Prop({
            required:true, trim:true
            })
            @Prop({
            required:true, default:0
            })
            valoracion: number;
              
}

export const resenaShecma = SchemaFactory.createForClass(resena);
