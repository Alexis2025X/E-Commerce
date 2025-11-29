import {IsString, IsOptional, IsNumber} from 'Class-validator'
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
export class actualizaCarrito{
        @IsString()
        @IsOptional()
        idProducto: string;
        @IsNumber()  
        @IsOptional()
        cantSelect: number;
}
export class UpdateUserDTO {
        @IsOptional()
        @IsString()
        nombre?: string;
        @IsOptional()
        @IsString()
        telefono?: string;
        @IsOptional()
        @IsString()
        correo?: string;
        @IsOptional()
        @IsString()
        contraseña?:string;
        @IsOptional()
        @IsString()
        status?: string;
        @ValidateNested()
        @Type(() => actualizaCarrito)
        carrito: actualizaCarrito


}