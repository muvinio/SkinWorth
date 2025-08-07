import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
  origin: 'http://localhost:3001', // или 3001, если ты его используешь
});

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
