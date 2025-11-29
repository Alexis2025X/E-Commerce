import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Producto } from './schemas/productos.schema';
import { Model } from 'mongoose';
import { CreateReseña } from './dto/create-producto.dto';
@Injectable()
export class ProductosService {
  constructor(@InjectModel(Producto.name) private ProductoModel: Model <Producto>) {}

  create(createProductoDto: CreateProductoDto) {
    // const createdProducto = new this.ProductoModel(createProductoDto);
    // return createdProducto.save();
    return this.ProductoModel.create(createProductoDto);
  }
  //return 'This action adds a new producto';

  findAll() {
    return this.ProductoModel.find().exec();
    //return `This action returns all productos QUE YO AGREGUE`;
  }

  findOne(id: string) {
    return this.ProductoModel.findById(id).exec();
    //return `This action returns a #${id} producto`;
  }

  update(id: string, updateProductoDto: UpdateProductoDto) {
    // return this.ProductoModel.findByIdAndUpdate(id, updateProductoDto, {
    //   new: true,
    // }).exec();
      return this.ProductoModel.findByIdAndUpdate(id, updateProductoDto, { new: true, }).exec();
  }

  remove(id: string) {
    return this.ProductoModel.findByIdAndDelete(id).exec();
  }

    async createitemResena(idProduct:string ,reseña:CreateReseña){
      return this.ProductoModel.findByIdAndUpdate(
          idProduct,
          {
              $push: {
                  resena:{
                      userReseña: reseña.userReseña,
                      userNameReseña: reseña.userNameReseña,
                      titulo:reseña.titulo,
                      descripcion: reseña.descripcion,
                      valoracion: reseña.valoracion
                  }
              },
          },
          {new:true}
      )
  
    }
}
