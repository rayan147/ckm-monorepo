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
import { PinpointModule } from 'src/pinpoint/pinpoint.module';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';

@Module({
  imports: [
    PinpointModule,
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
  providers: [AuthService, JwtStrategy, RoleGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
