// auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CsrfGuard } from 'src/csrf/csrf.guard';
import { EnvModule } from 'src/env/env.module';
import { AwsModule } from 'src/helpers/aws/aws.module';
import { I18nModule } from 'src/i18n/i18n.module';
import { RoleGuard } from '../guards/role.guard';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware.service';
import { AuthService } from './auth.service';
import { AuthSessionsService } from './utils/auth.sessions.service';
import { EmailTemplateService } from 'src/templates/email-template.service';

@Module({
  imports: [
    AwsModule,
    I18nModule,
    forwardRef(() => UsersModule),
    PrismaModule,
    PassportModule,
    EnvModule,
  ],
  providers: [AuthService, RoleGuard, AuthSessionsService, CsrfGuard, AuthMiddleware, EmailTemplateService],
  controllers: [AuthController],
  exports: [AuthService, AuthSessionsService],
})
export class AuthModule { }
