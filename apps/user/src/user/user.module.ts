import { User, UserSchema } from '@atm-microservices/common';
import { ConfigModule, ConfigService } from '@atm-microservices/config';
import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
