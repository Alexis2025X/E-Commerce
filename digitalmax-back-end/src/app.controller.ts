import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //Decorador
export class AppController {
  constructor(private readonly appService: AppService) {} //Constructor de la clase

  @Get()
  byeWorld(): string {
    return this.appService.getHello(); //this objeto interno de la clase
  }
}
