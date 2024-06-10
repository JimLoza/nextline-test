import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log']
  });
  app.setGlobalPrefix('api')

  // Enable cors to allow requests from domains
  app.enableCors({
    origin: '*'
  })

  // Setting up swagger
  const config = new DocumentBuilder()
    .setTitle('NEXTLINE API TEST')
    .addBearerAuth()
    .setDescription('The NEXTLINE api description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  await app.listen(envs.port);
  logger.log(`App running on port ${envs.port}`);
}
bootstrap();
