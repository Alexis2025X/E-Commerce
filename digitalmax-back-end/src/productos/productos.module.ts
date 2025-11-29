import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Mongoose } from 'mongoose';
import { ProductoSchema } from './schemas/productos.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Producto', schema: ProductoSchema }]),
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
