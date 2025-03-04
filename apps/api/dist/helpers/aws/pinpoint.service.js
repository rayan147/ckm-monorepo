"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinpointService = void 0;
const common_1 = require("@nestjs/common");
const client_pinpoint_1 = require("@aws-sdk/client-pinpoint");
const env_service_1 = require("../../env/env.service");
const aws_credentials_service_1 = require("./aws-credentials.service");
let PinpointService = class PinpointService {
    constructor(envService, awsCredentialsService) {
        this.envService = envService;
        this.awsCredentialsService = awsCredentialsService;
    }
    async onModuleInit() {
        await this.initalizePinpointClient();
    }
    async initalizePinpointClient() {
        const credentials = await this.awsCredentialsService.getCredentials();
        this.pinpointClient = new client_pinpoint_1.PinpointClient({
            region: this.envService.get('AWS_REGION'),
            credentials: {
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
                sessionToken: credentials.sessionToken,
            },
        });
    }
    async sendEmail(to, subject, htmlBody, textBody) {
        const params = {
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
                            TextPart: textBody
                                ? { Charset: 'UTF-8', Data: textBody }
                                : undefined,
                        },
                    },
                },
            },
        };
        try {
            const command = new client_pinpoint_1.SendMessagesCommand(params);
            const response = await this.pinpointClient.send(command);
            console.log('Email sent successfully:', response);
            return response;
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
    async sendSMS(to, message) {
        const params = {
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
        if (this.envService.get('NODE_ENV') !== 'prod')
            return;
        try {
            const command = new client_pinpoint_1.SendMessagesCommand(params);
            const response = await this.pinpointClient.send(command);
            console.log('SMS sent successfully:', response);
            return response;
        }
        catch (error) {
            console.error('Error sending SMS:', error);
            throw error;
        }
    }
    async sendSMSWithPool(to, message) {
        const params = {
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
            const command = new client_pinpoint_1.SendMessagesCommand(params);
            const response = await this.pinpointClient.send(command);
            console.log('SMS sent successfully using pool:', response);
            return response;
        }
        catch (error) {
            console.error('Error sending SMS using pool:', error);
            throw error;
        }
    }
};
exports.PinpointService = PinpointService;
exports.PinpointService = PinpointService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService, aws_credentials_service_1.AwsCredentialsService])
], PinpointService);
//# sourceMappingURL=pinpoint.service.js.map