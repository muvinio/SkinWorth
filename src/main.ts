import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
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
  
  app.use(
    session({
      secret: 'super_secret_key',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj: false | User | null | undefined, done) => done(null, obj));
  app.enableCors({
  origin: 'http://localhost:3001', // или 3001, если ты его используешь
});

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
