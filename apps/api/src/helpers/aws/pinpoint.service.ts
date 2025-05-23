import { Injectable } from '@nestjs/common';
import {
  PinpointClient,
  SendMessagesCommand,
  SendMessagesCommandInput,
} from '@aws-sdk/client-pinpoint';
import { EnvService } from 'src/env/env.service';
import { AwsCredentialsService } from './aws-credentials.service';

@Injectable()
export class PinpointService {
  private pinpointClient!: PinpointClient;

  constructor(
    private envService: EnvService,
    private awsCredentialsService: AwsCredentialsService,
  ) {}

  async onModuleInit() {
    await this.initalizePinpointClient();
  }

  private async initalizePinpointClient() {
    const credentials = await this.awsCredentialsService.getCredentials();

    this.pinpointClient = new PinpointClient({
      region: this.envService.get('AWS_REGION'),
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
      },
    });
  }

  async sendEmail(to: string, subject: string, htmlBody: string, textBody?: string) {
    const params: SendMessagesCommandInput = {
      ApplicationId: this.envService.get('PINPOINT_PROJECT_ID'),
      MessageRequest: {
        Addresses: {
          [to]: { ChannelType: 'EMAIL' },
        },
        MessageConfiguration: {
          EmailMessage: {
            FromAddress: this.envService.get('PINPOINT_FROM_EMAIL'),
            SimpleEmail: {
              Subject: { Charset: 'UTF-8', Data: subject },
              HtmlPart: { Charset: 'UTF-8', Data: htmlBody },
              TextPart: textBody ? { Charset: 'UTF-8', Data: textBody } : undefined,
            },
          },
        },
      },
    };

    try {
      const command = new SendMessagesCommand(params);
      const response = await this.pinpointClient.send(command);
      console.log('Email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendSMS(to: string, message: string) {
    const params: SendMessagesCommandInput = {
      ApplicationId: this.envService.get('PINPOINT_PROJECT_ID'),
      MessageRequest: {
        Addresses: {
          [to]: { ChannelType: 'SMS' },
        },
        MessageConfiguration: {
          SMSMessage: {
            Body: message,
            MessageType: 'TRANSACTIONAL',
            SenderId: this.envService.get('PINPOINT_SMS_SENDER_ID'),
          },
        },
      },
    };

    if (this.envService.get('NODE_ENV') !== 'prod') return;
    try {
      const command = new SendMessagesCommand(params);
      const response = await this.pinpointClient.send(command);
      console.log('SMS sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }
  async sendSMSWithPool(to: string, message: string) {
    const params: SendMessagesCommandInput = {
      ApplicationId: this.envService.get('PINPOINT_PROJECT_ID'),
      MessageRequest: {
        Addresses: {
          [to]: { ChannelType: 'SMS' },
        },
        MessageConfiguration: {
          SMSMessage: {
            Body: message,
            MessageType: 'TRANSACTIONAL',
            OriginationNumber: this.envService.get('SMS_POOL_ORIGINATION_NUMBER'),
            SenderId: this.envService.get('PINPOINT_SMS_SENDER_ID'),
          },
        },
      },
    };

    try {
      const command = new SendMessagesCommand(params);
      const response = await this.pinpointClient.send(command);
      console.log('SMS sent successfully using pool:', response);
      return response;
    } catch (error) {
      console.error('Error sending SMS using pool:', error);
      throw error;
    }
  }
}
