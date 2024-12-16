import { Module, Global } from '@nestjs/common';
import { S3Service } from './s3.aws.service';
import { KmsService } from './kms.aws.service';
import { EnvService } from 'src/env/env.service';
import { PinpointService } from './pinpoint.service';
import { AwsCredentialsService } from './aws-credentials.service';

@Global()
@Module({
  providers: [S3Service, KmsService, EnvService, PinpointService, AwsCredentialsService],
  exports: [S3Service, KmsService, PinpointService, AwsCredentialsService],
})
export class AwsModule { }
