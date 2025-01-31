import { ConfigModule } from "@nestjs/config";
import { EnvService } from "src/env/env.service";
import { CsrfController } from "./csrf.controller";
import { Module } from "@nestjs/common";


@Module({
  imports: [ConfigModule],
  controllers: [CsrfController],
  providers: [EnvService]
})
export class CsrfModule { }
