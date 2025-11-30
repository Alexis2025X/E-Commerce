import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDTO } from 'src/dto/updateUser.dto';
import { CreateUserDTO } from 'src/dto/createUser.dto';
import { actualizaCarrito } from 'src/dto/updateUser.dto';
import { CreateCarrito } from 'src/dto/createUser.dto';
import { User } from 'src/schemas/user.schema';
import { Logindto } from 'src/dto/Login.dto';

import {hash, compare} from 'bcrypt'

import jwt from 'jsonwebtoken'
import { Request, response, Response } from 'express';
import {serialize} from 'cookie'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  finALL() {
    return this.userModel.find();
  }

  async create(createUser: CreateUserDTO) {
    try {
      this.userModel.create();

    const {contraseña} = createUser

    const contraHasheada = await hash(contraseña,10)
    createUser = {...createUser, contraseña:contraHasheada}

    const newUser = new this.userModel(createUser);
    return newUser.save();
    } catch (error) {
      const res = response
      return  res.status(409)
    }
    
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

  //servicio de logeo
  async login(userDta: Logindto, res:Response){

      const {correo, contraseña} = userDta;
      const findUser = await this.userModel.findOne({correo: correo})

      if(!findUser) return new HttpException("Usuario no encontrado", 404)
      
        const validaPass= compare(contraseña, findUser?.contraseña);

        if(!validaPass){
        return new HttpException("Contraseña incorrecta", 403)

        }
          
         

          const token = jwt.sign({

            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2,
            iduser: findUser?._id,
            correo: findUser?.correo,
            nombre: findUser?.nombre,
            status: findUser?.status
          }, 'secret')
          
          const seralizado = serialize('mitoken', token,
            {
              httpOnly:true,
              secure:false,
              sameSite: 'lax',
              maxAge: 100 * 60 *60 * 2,
            }
          )

          res.setHeader('Set-Cookie', seralizado)

          return res.json(seralizado)


  }

  async getToken(req: Request,res:Response) {
    try{
    const token = req.cookies['mitoken'];
    const dataUser =  jwt.verify(token,"secret")
    return res.json(dataUser)
    }catch(error){
      throw new HttpException("Token invalido",401)
    }
    
   
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

  async createitemCar(idUser: string, carrito: CreateCarrito) {
    return this.userModel.findByIdAndUpdate(
      idUser,
      {
        $push: {
          carrito: {
            idProducto: carrito.idProducto,
            cantSelect: carrito.cantSelect
          },
        },
      },
      { new: true }
    )

  }

  async eliminarItemCarritoUser(iduser: string, idProduct: string) {
    return this.userModel.findByIdAndUpdate(
      iduser,
      {
        $pull: {
          carrito: { _id: idProduct },
        },

      },

      { new: true }

    );
  }

  async actualizarItemCarritoUser(
    iduser: string,
    idProduct: string,
    carrito: actualizaCarrito,
  ) {

    return await this.userModel.findByIdAndUpdate(
      { _id: iduser },
      {
        $set: {
          'carrito.$[elem].idProducto': carrito.idProducto,
          'carrito.$[elem].cantSelect': carrito.cantSelect
        }
      },
      {
        arrayFilters: [{ 'elem._id': idProduct }],
        new: true
      }

    ).exec();
  }
}

