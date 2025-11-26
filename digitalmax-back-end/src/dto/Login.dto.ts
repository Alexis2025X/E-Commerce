import {IsString, IsNotEmpty} from 'Class-validator'


export class Logindto{
    @IsString()
            @IsNotEmpty()
            correo: string;
            @IsString()
            @IsNotEmpty()
            contraseña:string;
}