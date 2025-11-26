import { Controller, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, userShecma } from 'src/schemas/user.schema';

@Module({
    imports: [
      MongooseModule.forFeature([
      {
        name: User.name,
        schema: userShecma
      }
        
    ]),
    
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
