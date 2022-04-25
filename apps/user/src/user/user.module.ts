import { CONSUMER_GROUPS, User, UserSchema } from '@atm-microservices/common';
import { ConfigModule, ConfigService } from '@atm-microservices/config';
import { Module } from '@nestjs/common';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ClientsModule.register([
      {
        name: 'MAIL-SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'mail-service',
            brokers: [new ConfigService().get('KAFKA_BROKER_HOST')],
          },
          consumer: {
            groupId: CONSUMER_GROUPS.MAILER_GROUP,
            allowAutoTopicCreation: true,
          },
        },
      }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
