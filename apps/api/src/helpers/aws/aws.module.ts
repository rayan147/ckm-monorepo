import { Module, Global } from '@nestjs/common';
import { S3Service } from './s3.aws.service';
import { KmsService } from './kms.aws.service';
import { EnvService } from 'src/env/env.service';

@Global()
@Module({
  providers: [S3Service, KmsService, EnvService],
  exports: [S3Service, KmsService],
})
export class AwsModule { }
