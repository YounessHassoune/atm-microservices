import { ConfigModule, ConfigService } from '@atm-microservices/config';
import {  Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';



@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get('MONGO_DSN'))
        const options: MongooseModuleOptions = {
          uri: configService.get('MONGO_DSN'),
        };
        return options;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
