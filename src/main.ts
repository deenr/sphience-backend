import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: ['http://localhost:4200'] });

  const config = new DocumentBuilder().setTitle('Sphience API').setDescription('The Sphience API description').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );

  await app.listen(3000);
}
bootstrap();
