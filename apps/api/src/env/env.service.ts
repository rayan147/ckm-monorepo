import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { Env } from './env';

@Injectable()
export class EnvService implements OnModuleInit {
  private secretsManagerValues: Partial<Env> = {};

  constructor(private configService: ConfigService<Env, true>) {}

  async onModuleInit() {
    if (this.configService.get('NODE_ENV') === 'production') {
      await this.loadFromSecretsManager();
    }
  }

  private async loadFromSecretsManager() {
    const client = new SecretsManagerClient({
      region: this.configService.get('AWS_REGION'),
    });
    const secretName = this.configService.get('AWS_SECRETS_NAME');

    if (!secretName) {
      throw new Error('AWS_SECRET_ACCESS_KEY is not defined');
    }

    try {
      const command = new GetSecretValueCommand({ SecretId: secretName });
      const response = await client.send(command);

      if (response.SecretString) {
        this.secretsManagerValues = JSON.parse(
          response.SecretString,
        ) as Partial<Env>;
      } else {
        throw new Error('Secret string is empty');
      }
    } catch (error) {
      console.error('Failed to load secrets from AWS Secrets Manager:', error);
      throw error;
    }
  }

  get<T extends keyof Env>(key: T): Env[T] {
    if (this.configService.get('NODE_ENV') === 'production') {
      const secretValue = this.secretsManagerValues[key];
      if (secretValue !== undefined) {
        return secretValue as Env[T];
      }
    }
    return this.configService.get(key, { infer: true });
  }
}
