import { Module } from '@nestjs/common';
import { ShiftService } from './shifts.service';
import { ShiftController } from './shifts.controller';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingModule } from '../logging/logging.module';
import { AuthSessionsService } from 'src/auth/utils/auth.sessions.service';
import { EnvModule } from 'src/env/env.module';
import { CsrfModule } from 'src/csrf/csrf.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [LoggingModule, EnvModule, CsrfModule, AuthModule],
  providers: [ShiftService, PrismaService, AuthSessionsService],
  controllers: [ShiftController],
  exports: [ShiftService],
})
export class ShiftModule { }
