import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductosModule } from './productos/productos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        //uri: configService.getOrThrow('BASE_URI'),
        uri: configService.getOrThrow('MONGO_URI_Alexis'),
        //uri: configService.get<string>('MONGO_URI_Alexis'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ProductosModule],
  controllers: [AppController],
  providers: [AppService],
})

// @Module({
//   imports: [

//     ConfigModule.forRoot({ isGlobal: true }),
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         uri: configService.get<string>('MONGO_URI_Alexis'),
//       }),
//       inject: [ConfigService],
//     }),
//     ProductosModule],
//   controllers: [AppController],
//   providers: [AppService],
//     //UserModule, ProductosModule],
// })
export class AppModule {}
