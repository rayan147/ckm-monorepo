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
import { AuthService } from './auth.service';
import { AuthSessionsService } from './utils/auth.sessions.service';
import { EmailTemplateService } from 'src/templates/email-template.service';
import { SessionInitMiddleware } from './auth.session.middleware.service';
import { CsrfModule } from 'src/csrf/csrf.module';

@Module({
  imports: [
    AwsModule,
    I18nModule,
    forwardRef(() => UsersModule),
    PrismaModule,
    PassportModule,
    EnvModule,
    CsrfModule
  ],
  providers: [AuthService, RoleGuard, AuthSessionsService, CsrfGuard, SessionInitMiddleware, EmailTemplateService],
  controllers: [AuthController],
  exports: [AuthService, AuthSessionsService],
})
export class AuthModule { }
