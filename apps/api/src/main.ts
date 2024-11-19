import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LanguageInterceptor } from './i18n/language.interceptor';
import { I18nService } from './i18n/i18n.service';

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

  const configService = app.get(EnvService);
  const port = configService.get('PORT');
  // CORS configuration
  const corsOrigin = configService.get('CORS_ORIGIN');
  app.enableCors({
    origin: corsOrigin === '*' ? '*' : corsOrigin.split(','),
    // origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });

  const database_url = configService.get('DATABASE_URL')
  console.log({ database_url })
  await app.listen(port);
}
bootstrap();
