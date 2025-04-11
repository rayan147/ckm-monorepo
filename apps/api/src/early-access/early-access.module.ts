import { Module } from '@nestjs/common';
import { EarlyAccessController } from './early-access.controller';
import { EarlyAccessService } from './early-access.service';
import { AwsModule } from 'src/helpers/aws/aws.module';

@Module({
  controllers: [EarlyAccessController],
  providers: [EarlyAccessService],
  imports: [AwsModule],
})
export class EarlyAccessModule {}
