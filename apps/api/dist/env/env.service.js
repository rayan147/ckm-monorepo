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
exports.EnvService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
let EnvService = class EnvService {
    constructor(configService) {
        this.configService = configService;
        this.secretsManagerValues = {};
    }
    async onModuleInit() {
        if (this.configService.get('NODE_ENV') === 'production') {
            await this.loadFromSecretsManager();
        }
    }
    async loadFromSecretsManager() {
        const client = new client_secrets_manager_1.SecretsManagerClient({
            region: this.configService.get('AWS_REGION'),
        });
        const secretName = this.configService.get('AWS_SECRETS_NAME');
        if (!secretName) {
            throw new Error('AWS_SECRET_ACCESS_KEY is not defined');
        }
        try {
            const command = new client_secrets_manager_1.GetSecretValueCommand({ SecretId: secretName });
            const response = await client.send(command);
            if (response.SecretString) {
                this.secretsManagerValues = JSON.parse(response.SecretString);
            }
            else {
                throw new Error('Secret string is empty');
            }
        }
        catch (error) {
            console.error('Failed to load secrets from AWS Secrets Manager:', error);
            throw error;
        }
    }
    get(key) {
        if (this.configService.get('NODE_ENV') === 'production') {
            const secretValue = this.secretsManagerValues[key];
            if (secretValue !== undefined) {
                return secretValue;
            }
        }
        return this.configService.get(key, { infer: true });
    }
};
exports.EnvService = EnvService;
exports.EnvService = EnvService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EnvService);
//# sourceMappingURL=env.service.js.map