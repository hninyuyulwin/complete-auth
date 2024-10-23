import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, 
    forbidNonWhitelisted:true
  }))
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Swagger Testing in complete auth')
    .setDescription('For swagger testing api')
    .setVersion('1.0')
    .addTag('Swagger in Nestjs')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api-testing', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
