// auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { I18nModule } from 'src/i18n/i18n.module';
import { RoleGuard } from '../guards/role.guard';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';
import { AuthSessionsService } from './utils/auth.sessions.service';
import { AwsModule } from 'src/helpers/aws/aws.module';

@Module({
  imports: [
    AwsModule,
    I18nModule,
    forwardRef(() => UsersModule),
    PrismaModule,
    PassportModule,
    EnvModule,
    JwtModule.registerAsync(({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        secret: envService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '60s' }
      })
    }))
  ],
  providers: [AuthService, JwtStrategy, RoleGuard, AuthSessionsService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
