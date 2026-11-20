import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  validateEnvironment();

  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  const corsOrigin = process.env.CORS_ORIGIN;
  if (corsOrigin) {
    app.enableCors({
      origin: corsOrigin.split(',').map((origin) => origin.trim()),
    });
  }

  const config = new DocumentBuilder()
    .setTitle('API CINEMA')
    .setDescription('documentarion api cinema.')
    .setVersion('1.0')
    .addTag('cinema')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // <- transforma os dados da requisição
      whitelist: true, // <- remove propriedades que não estão no DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

function validateEnvironment() {
  const requiredVariables = ['DATABASE_URL', 'JWT_SECRET'];
  const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable],
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVariables.join(', ')}`,
    );
  }
}

bootstrap();
