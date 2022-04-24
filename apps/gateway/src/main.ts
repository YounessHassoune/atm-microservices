import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@atm-microservices/config';
import { AppModule } from './modules/app/app.module';
import helmet from 'helmet';
import { HttpExceptionFilter } from '@atm-microservices/common';


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
  const port = app.get(ConfigService).get('PORT');
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
    }
  ));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.listen(port).then(() => Logger.log(` 🚀 Gateway is running on: http://localhost:${port}`));

}

bootstrap();
