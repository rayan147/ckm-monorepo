// src/csrf/csrf.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvService } from "../env/env.service";
import { CsrfController } from "./csrf.controller";
import { CsrfGuard } from "./csrf.guard";

@Module({
  imports: [ConfigModule],
  controllers: [CsrfController],
  providers: [EnvService, CsrfGuard],
  exports: [CsrfGuard]
})
export class CsrfModule { }
