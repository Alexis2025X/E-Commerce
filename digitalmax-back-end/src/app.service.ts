import { Injectable } from '@nestjs/common';

@Injectable() //Decorador de typescript
export class AppService {
  //
  getHello(): string {
    return 'Prueba!';
  }
}
