import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Z-FARMING')
    .setDescription('DOCS API Z-FARMING')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  // const configService = app.get(ConfigService);
  // const port = configService.get('PORT');
  await app.listen(3000);
}

bootstrap();
