import { CONSUMER_GROUPS } from '@atm-microservices/common';
import { ConfigService } from '@atm-microservices/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './app/user.module';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [new ConfigService().get('KAFKA_BROKER_HOST')],
      },
      consumer: {
        groupId:CONSUMER_GROUPS.USER_GROUP,
        allowAutoTopicCreation: true,
      }
    }
  });
  app.listen().then(() => Logger.log(`🚀 User service is listening ...`));
}

bootstrap();
