import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from 'libs/config/src/lib/config.service';
import { AppModule } from './app/app.module';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ATM Microservices Backend')
    .setDescription('Documentation for the ATM application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  const port = app.get(ConfigService).port;
  await app.listen(port);
  Logger.log(
    ` 🚀 Gateway is running on: http://localhost:${port}`
  );
}

bootstrap();
