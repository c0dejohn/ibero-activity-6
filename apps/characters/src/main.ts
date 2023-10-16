import { NestFactory } from '@nestjs/core';
import { CharactersModule } from './characters.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CharactersModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  await app.listen(3002);
}
bootstrap();
