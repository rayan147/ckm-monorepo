import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts';
import { EnvService } from 'src/env/env.service';

export interface AwsCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  expiration?: Date;
}

@Injectable()
export class AwsCredentialsService implements OnModuleInit {
  private stsClient: STSClient;
  private tempCredentials: AwsCredentials | null = null;
  private roleArn: string;
  private readonly CREDENTIALS_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor(private envService: EnvService) {
    this.roleArn = this.envService.get('AWS_ROLE_ARN');
    this.stsClient = new STSClient({
      region: this.envService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.envService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async onModuleInit() {
    await this.refreshCredentials();
  }

  private async refreshCredentials(): Promise<void> {
    try {
      const command = new AssumeRoleCommand({
        RoleArn: this.roleArn,
        RoleSessionName: `temp-session-${Date.now()}`,
        DurationSeconds: 3600, // 1 hour
      });

      const response = await this.stsClient.send(command);

      if (!response.Credentials) {
        throw new Error('Failed to obtain temporary credentials');
      }

      this.tempCredentials = {
        accessKeyId: response.Credentials.AccessKeyId!,
        secretAccessKey: response.Credentials.SecretAccessKey!,
        sessionToken: response.Credentials.SessionToken,
        expiration: response.Credentials.Expiration,
      };

      // Schedule next refresh
      const refreshTime = this.calculateRefreshTime();
      setTimeout(() => {
        this.refreshCredentials();
      }, refreshTime);
    } catch (error) {
      console.error('Failed to refresh AWS credentials:', error);
      throw new InternalServerErrorException();
    }
  }

  private calculateRefreshTime(): number {
    if (!this.tempCredentials?.expiration) {
      return this.CREDENTIALS_REFRESH_THRESHOLD;
    }

    const expirationTime = this.tempCredentials.expiration.getTime();
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;

    // Refresh 5 minutes before expiration or immediately if less than threshold
    return Math.max(0, timeUntilExpiration - this.CREDENTIALS_REFRESH_THRESHOLD);
  }

  async getCredentials(): Promise<AwsCredentials> {
    if (!this.tempCredentials) {
      await this.refreshCredentials();
    } else if (this.shouldRefreshCredentials()) {
      await this.refreshCredentials();
    }

    return this.tempCredentials!;
  }

  private shouldRefreshCredentials(): boolean {
    if (!this.tempCredentials?.expiration) {
      return true;
    }

    const currentTime = Date.now();
    const expirationTime = this.tempCredentials.expiration.getTime();

    return expirationTime - currentTime <= this.CREDENTIALS_REFRESH_THRESHOLD;
  }
}
