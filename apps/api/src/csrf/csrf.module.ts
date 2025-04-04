// src/csrf/csrf.module.ts
import { Module } from '@nestjs/common';
import { CsrfGuard } from './csrf.guard';
import { EnvModule } from 'src/env/env.module';
import { CsrfService } from './csrf.service';

@Module({
  imports: [EnvModule],
  providers: [CsrfService, CsrfGuard],
  exports: [CsrfService, CsrfGuard],
})
export class CsrfModule { }
