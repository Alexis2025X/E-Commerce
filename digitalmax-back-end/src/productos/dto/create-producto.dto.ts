import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'Class-validator';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateReseña{
        @IsString()
        @IsNotEmpty()
        userReseña: string;
        @IsString()
        @IsNotEmpty()
        userNameReseña: string;
        @IsString()
        @IsNotEmpty()
        titulo: string;
        @IsString()
        @IsNotEmpty()
        descripcion: string;
        @IsNotEmpty()
        @IsNumber()            
        valoracion: number;
}

export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
  @IsNotEmpty()
  @IsString()
  categoria: string;

  @IsNotEmpty()
  @IsString()
  marca: string;
  @IsNotEmpty()
  @IsString()
  modelo: string;
  @IsNotEmpty()
  @IsString()
  imagenUrl: string;
  @IsNotEmpty()
  @IsString()
  imagenUrl1: string;
  @IsNotEmpty()
  @IsString()
  imagenUrl2: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  descuento: number;
  @IsNotEmpty()
  @IsNumber()
  stock: number;
  @IsNotEmpty()
  @IsString()
  descripcion: string;
  @IsNotEmpty()
  @IsString()
  especificaciones: string;

  @IsNotEmpty()
  @IsString()
  detallesFisicos: string;
  @IsNotEmpty()
  @IsString()
  paisOrigen: string;
  @IsNotEmpty()
  @IsNumber()
  valoracion: number;
   @ValidateNested()
      @Type(() => CreateReseña)
      resenas: CreateReseña
}
