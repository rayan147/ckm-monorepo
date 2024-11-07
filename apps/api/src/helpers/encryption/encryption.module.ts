import { Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { EnvModule } from '../../env/env.module';
import { LoggingModule } from '../../logging/logging.module';

@Module({
  imports: [EnvModule, LoggingModule],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
