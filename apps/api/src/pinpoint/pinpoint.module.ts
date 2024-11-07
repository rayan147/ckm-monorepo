import { Module } from '@nestjs/common';
import { PinpointService } from './pinpoint.service';
import { EnvModule } from 'src/env/env.module';

@Module({
  providers: [PinpointService],
  imports: [EnvModule],
  exports: [PinpointService],
})
export class PinpointModule {}
