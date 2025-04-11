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
exports.KmsService = void 0;
const common_1 = require("@nestjs/common");
const client_kms_1 = require("@aws-sdk/client-kms");
const client_kms_2 = require("@aws-sdk/client-kms");
const env_service_1 = require("../../env/env.service");
const aws_credentials_service_1 = require("./aws-credentials.service");
let KmsService = class KmsService {
    constructor(envService, awsCredentialsService) {
        this.envService = envService;
        this.awsCredentialsService = awsCredentialsService;
    }
    async onModuleInit() {
        await this.initializeKmsClient();
    }
    async initializeKmsClient() {
        const credentials = await this.awsCredentialsService.getCredentials();
        this.kmsClient = new client_kms_1.KMSClient({
            region: this.envService.get('AWS_REGION'),
            credentials: {
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
                sessionToken: credentials.sessionToken,
            },
        });
    }
    async encrypt(keyId, plaintext) {
        const command = new client_kms_1.EncryptCommand({
            KeyId: keyId,
            Plaintext: plaintext,
        });
        const response = await this.kmsClient.send(command);
        return Buffer.from(response.CiphertextBlob || '');
    }
    async decrypt(ciphertext) {
        const command = new client_kms_1.DecryptCommand({
            CiphertextBlob: ciphertext,
        });
        const response = await this.kmsClient.send(command);
        return Buffer.from(response.Plaintext || '');
    }
    async generateDataKey(keyId, keySpec = client_kms_2.DataKeySpec.AES_256) {
        const command = new client_kms_1.GenerateDataKeyCommand({
            KeyId: keyId,
            KeySpec: keySpec,
        });
        const response = await this.kmsClient.send(command);
        return {
            plaintext: Buffer.from(response.Plaintext || ''),
            ciphertext: Buffer.from(response.CiphertextBlob || ''),
        };
    }
};
exports.KmsService = KmsService;
exports.KmsService = KmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService,
        aws_credentials_service_1.AwsCredentialsService])
], KmsService);
//# sourceMappingURL=kms.aws.service.js.map