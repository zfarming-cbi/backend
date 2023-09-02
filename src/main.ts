import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const preffix = 'api/v1';
  const config = new DocumentBuilder()
    .setBasePath(preffix)
    .setTitle('Z-FARMING')
    .setDescription('DOCS API Z-FARMING')
    .setVersion('1.0')
    .build();
  app.setGlobalPrefix(preffix);
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  await app.listen(port);
}

bootstrap();
