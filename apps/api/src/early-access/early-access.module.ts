import { Module } from '@nestjs/common';
import { EarlyAccessController } from './early-access.controller';
import { EarlyAccessService } from './early-access.service';
import { PinpointModule } from 'src/pinpoint/pinpoint.module';

@Module({
  controllers: [EarlyAccessController],
  providers: [EarlyAccessService],
  imports: [PinpointModule],
})
export class EarlyAccessModule {}
