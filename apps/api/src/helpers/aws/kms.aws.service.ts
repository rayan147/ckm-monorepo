import { Injectable } from '@nestjs/common';
import {
  KMSClient,
  EncryptCommand,
  DecryptCommand,
  GenerateDataKeyCommand,
} from '@aws-sdk/client-kms';
import { DataKeySpec } from '@aws-sdk/client-kms';
import { EnvService } from '../../env/env.service';
import { AwsCredentialsService } from './aws-credentials.service';

@Injectable()
export class KmsService {
  private kmsClient!: KMSClient;

  constructor(private envService: EnvService, private awsCredentialsService: AwsCredentialsService) {
  }

  async onModuleInit() {
    await this.initializeKmsClient();
  }

  private async initializeKmsClient() {
    const credentials = await this.awsCredentialsService.getCredentials();

    this.kmsClient = new KMSClient({
      region: this.envService.get('AWS_REGION'),
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
      },
    });
  }

  async encrypt(keyId: string, plaintext: Buffer): Promise<Buffer> {
    const command = new EncryptCommand({
      KeyId: keyId,
      Plaintext: plaintext,
    });

    const response = await this.kmsClient.send(command);
    return Buffer.from(response.CiphertextBlob || '');
  }

  async decrypt(ciphertext: Buffer): Promise<Buffer> {
    const command = new DecryptCommand({
      CiphertextBlob: ciphertext,
    });

    const response = await this.kmsClient.send(command);
    return Buffer.from(response.Plaintext || '');
  }

  async generateDataKey(
    keyId: string,
    keySpec: DataKeySpec = DataKeySpec.AES_256,
  ): Promise<{ plaintext: Buffer; ciphertext: Buffer }> {
    const command = new GenerateDataKeyCommand({
      KeyId: keyId,
      KeySpec: keySpec,
    });

    const response = await this.kmsClient.send(command);
    return {
      plaintext: Buffer.from(response.Plaintext || ''),
      ciphertext: Buffer.from(response.CiphertextBlob || ''),
    };
  }
}
