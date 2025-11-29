import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsOptional } from 'Class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  @IsOptional()
  nombre: string;
  @IsOptional()
  categoria: string;
  @IsOptional()
  marca: string;
  @IsOptional()
  modelo: string;
  @IsOptional()
  imagenUrl: string;
  @IsOptional()
  imagenUrl1: string;
  @IsOptional()
  imagenUrl2: string;
  @IsOptional()
  precio: number;
  @IsOptional()
  descuento: number;
  @IsOptional()
  stock: number;
  @IsOptional()
  descripcion: string;
  @IsOptional()
  especificaciones: string;
  @IsOptional()
  detallesFisicos: string;
  @IsOptional()
  paisOrigen: string;
  @IsOptional()
  valoracion: number;
}
