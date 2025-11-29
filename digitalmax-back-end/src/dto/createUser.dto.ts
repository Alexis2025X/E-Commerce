import {IsString, IsOptional,IsNotEmpty, IsNumber } from 'Class-validator'
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';


export class CreateCarrito{
        @IsString()
        @IsNotEmpty()
        idProducto: string;
        @IsNotEmpty()
        @IsNumber()            
        cantSelect: number;
}
export class CreateUserDTO {
        @IsNotEmpty()
        @IsString() 
        nombre: string;
        @IsString()
        @IsNotEmpty()
        telefono: string;
        @IsString()
        @IsNotEmpty()
        correo: string;
        @IsString()
        @IsNotEmpty()
        contraseña:string;
        @IsOptional()
        @IsString()
        status: string;
        
        @ValidateNested()
        @Type(() => CreateCarrito)
        carrito: CreateCarrito
}
