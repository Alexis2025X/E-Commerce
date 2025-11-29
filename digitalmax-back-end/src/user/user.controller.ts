import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ConflictException,
  HttpCode,
  Res,
  Req,

} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/dto/createUser.dto';
import { UpdateUserDTO } from 'src/dto/updateUser.dto';
import { actualizaCarrito } from 'src/dto/updateUser.dto';
import { CreateCarrito } from 'src/dto/createUser.dto';
import { Logindto } from 'src/dto/Login.dto';
import type { Response, Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async finsALL() {
    const consulta = await this.userService.finALL();
    if (!consulta) {
      throw new ConflictException('NO se encuentrar usuarios registrados');
    }
    return consulta;
  }
  @Get(':correo')
  async findOne(@Param('correo') correouser: string) {
    const consulta = await this.userService.findOne(correouser);
    if (!consulta) {
      throw new ConflictException('Usuario no existente');
    } else {
      return consulta;
    }
  }

  @Post()
  create(@Body() CreateUser: CreateUserDTO) {
    try {
      return this.userService.create(CreateUser);
    } catch (error) {
      if ((error.code = '11000')) {
        throw new ConflictException('El usuario ya existe');
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const consult = await this.userService.eliminarUser(id);
    if (!consult) {
      throw new ConflictException('El usuario que intenta eliminar no existe');
    }
    return consult;
  }
  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    const consulta = await this.userService.actualizarUser(id, user);
    if (!consulta) {
      throw new ConflictException('El usuario que intenta editar no existe');
    }
    return consulta;
  }
  //controlador del login
  @Post('login')
  loginUser(@Body() userLogin: Logindto, @Res() res: Response) {
    return this.userService.login(userLogin, res);
  }

  @Get('/login/token')
  getCookie(@Req() req: Request, @Res() res: Response) {
   
    return this.userService.getToken(req,res);
}


  //Comienza el controlador de carrito de compra

  @Post(':id/carrito')
  createitemCarrito(
    @Param('id') id: string,
    @Body() Createitem: CreateCarrito,
  ) {
    try {
      return this.userService.createitemCar(id, Createitem);
    } catch (error) {
      if ((error.code = '11000')) {
        throw new ConflictException('El usuario ya existe');
      }
      throw error;
    }
  }

  @Get(':id/carrito')
  async findAllCar(@Param('id') id: string) {
    return this.userService.findOneCarrito(id);
  }

  @Put(':id/carrito/:idProduct')
  @HttpCode(200)
  async updatecarrito(
    @Param('id') id: string,
    @Param('idProduct') idProduct: string,
    @Body() carrito: actualizaCarrito,
  ) {
    const consulta = await this.userService.actualizarItemCarritoUser(
      id,
      idProduct,
      carrito,
    );
    if (!consulta) {
      throw new ConflictException(
        'El usuario que intenta editar no existe ' + consulta,
      );
    }
    return consulta;
  }
  @Delete(':iduser/carrito/:idproduct')
  @HttpCode(204)
  async deleteItemCarrito(
    @Param('iduser') iduser: string,
    @Param('idproduct') idProduct: string,
  ) {
    const consult = await this.userService.eliminarItemCarritoUser(
      iduser,
      idProduct,
    );
    if (!consult) {
      throw new ConflictException(
        'El item de carrito que intenta eliminar no existe ' + consult,
      );
    }
    return consult;
  }
}
