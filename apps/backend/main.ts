import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';
import { config } from './src/config/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors(config.api.cors);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  await app.listen(process.env.BACKEND_PORT ?? 3001);
}

bootstrap();
