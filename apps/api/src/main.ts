import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LanguageInterceptor } from './i18n/language.interceptor';
import { I18nService } from './i18n/i18n.service';
import cookieParser from 'cookie-parser';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalInterceptors(new LanguageInterceptor(app.get(I18nService)));
  const config = new DocumentBuilder()
    .setTitle('CKM API')
    .setDescription('Cloud based kitchen management server ')
    .setVersion('1.0')
    .addTag('CKM')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());
  app.use(cookieParser());

  const configService = app.get(EnvService);
  const port = configService.get('PORT');
  // 1. Enable CORS for SvelteKit frontend
  const corsOrigin = configService.get('CORS_ORIGIN');
  app.enableCors({
    origin: corsOrigin === '*' ? '*' : corsOrigin.split(','),
    // origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'x-csrf-token'],
    exposedHeaders: ['set-cookie'],
  });

  app.use(express.urlencoded({ extended: true, limit: '1kb' }));
  app.use(express.json({ limit: '1kb' }));

  await app.listen(port);
}
bootstrap();
