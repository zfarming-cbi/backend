import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const preffix = 'api/v1';
  const config = new DocumentBuilder()
    .setTitle('Z-FARMING')
    .setDescription('DOCS API Z-FARMING')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.setGlobalPrefix(preffix);
  app.useGlobalPipes(new ValidationPipe());
  app.use('/images', express.static(join(__dirname, '../images')));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.useBodyParser('urlencoded', { limit: '30mb' });
  app.useBodyParser('json');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  await app.listen(port);
}

bootstrap();
