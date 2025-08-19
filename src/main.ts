import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { User } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
  origin: 'http://localhost:3001', // или 3001, если ты его используешь
});

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
