import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { EnvModule } from 'src/env/env.module';
import { AuthSessionsService } from 'src/auth/utils/auth.sessions.service';
import { CsrfModule } from 'src/csrf/csrf.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [EnvModule, CsrfModule, AuthModule],
  controllers: [OrganizationController],
  providers: [OrganizationService, AuthSessionsService],
  exports: [OrganizationService],
})
export class OrganizationModule { }
