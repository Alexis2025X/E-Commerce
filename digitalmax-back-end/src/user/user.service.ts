import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDTO } from 'src/dto/updateUser.dto';
import { CreateUserDTO } from 'src/dto/createUser.dto';
import { actualizaCarrito } from 'src/dto/updateUser.dto';
import { CreateCarrito } from 'src/dto/createUser.dto';
import { User } from 'src/schemas/user.schema';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  finALL() {
    return this.userModel.find();
  }

  async create(createUser: CreateUserDTO) {
    this.userModel.create();
    const newUser = new this.userModel(createUser);
    return newUser.save();
  }

  async findOne(correouser: string) {
    return await this.userModel.findOne({ correo: correouser });
  }

  async eliminarUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
  async actualizarUser(id: string, user: UpdateUserDTO) {
    return this.userModel.findByIdAndUpdate(id, user);
  }

  //
  //Comienza la configuracion del controlador para el carrito de compra del usuario
  //

  async findOneCarrito(id: string) {
    try {
      const carritoCompra = await this.userModel
        .find({ _id: id })
        .select('carrito -_id')
        .exec();
      return carritoCompra;
    } catch (error) {
      throw 'Carrito no encontrado ' + error;
    }
  }

  async createitemCar(idUser:string ,carrito:CreateCarrito){
    return this.userModel.findByIdAndUpdate(
        idUser,
        {
            $push: {
                carrito:{
                    idProducto: carrito.idProducto,
                    cantSelect: carrito.cantSelect
                },
            },
        },
        {new:true}
    )

  }

  async eliminarItemCarritoUser(iduser: string, idProduct: string) {
    return this.userModel.findByIdAndUpdate(
        iduser,
        {
            $pull:{
                carrito: {_id:idProduct},
            },

        },
        
        {new:true}
    
  );
  }

  async actualizarItemCarritoUser(
    iduser: string,
    idProduct: string,
    carrito: actualizaCarrito,
  ) {

       return await  this.userModel.findByIdAndUpdate(
        {_id:iduser},
        {
            $set:{
            'carrito.$[elem].idProducto': carrito.idProducto,
            'carrito.$[elem].cantSelect': carrito.cantSelect
            }
        },
        {
            arrayFilters:[{'elem._id': idProduct}],
            new:true
        }

       ).exec();
       
    }  
}

