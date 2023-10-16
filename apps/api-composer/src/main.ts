import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const swaggerServer = app.get(ConfigService).get('SWAGGER_URL');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('my-disney-world-api')
    .setVersion('1.13.0')
    .addTag('composer')
    .addServer(swaggerServer)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api-docs', app, document);
  app.use(helmet());
  const port = app.get(ConfigService).get('PORT', 3000);
  await app.listen(port);
}
bootstrap();
