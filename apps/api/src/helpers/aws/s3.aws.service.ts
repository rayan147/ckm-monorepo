import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { EnvService } from '../../env/env.service';
import { AwsCredentialsService } from './aws-credentials.service';



@Injectable()
export class S3Service {
  private s3Client!: S3Client;

  constructor(private envService: EnvService, private awsCredentialsService: AwsCredentialsService) { }
  async onModuleInit() {
    await this.initalizeS3Client()
  }

  private async initalizeS3Client() {

    const credentials = await this.awsCredentialsService.getCredentials();

    this.s3Client = new S3Client({
      region: this.envService.get('AWS_REGION'),
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
      },
    });
  }



  async uploadFile(
    bucketName: string,
    key: string,
    body: Buffer,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ACL: 'public-read'
    });

    await this.s3Client.send(command);
    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  }

  async getSignedUrl(
    bucketName: string,
    key: string,
    expiresIn: number = 3600,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  async deleteFile(bucketName: string, key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await this.s3Client.send(command);
  }
}
