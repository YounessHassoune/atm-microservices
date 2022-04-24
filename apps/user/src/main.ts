import { CONSUMER_GROUPS, ExceptionFilter } from '@atm-microservices/common';
import { ConfigService } from '@atm-microservices/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, {
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
  app.useGlobalFilters(new ExceptionFilter());
  app.listen().then(() => Logger.log(`🚀 User service is listening ...`));
}

bootstrap();
