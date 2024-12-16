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
exports.AwsCredentialsService = void 0;
const common_1 = require("@nestjs/common");
const client_sts_1 = require("@aws-sdk/client-sts");
const env_service_1 = require("../../env/env.service");
let AwsCredentialsService = class AwsCredentialsService {
    constructor(envService) {
        this.envService = envService;
        this.tempCredentials = null;
        this.CREDENTIALS_REFRESH_THRESHOLD = 5 * 60 * 1000;
        this.roleArn = this.envService.get('AWS_ROLE_ARN');
        this.stsClient = new client_sts_1.STSClient({
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
    async refreshCredentials() {
        try {
            const command = new client_sts_1.AssumeRoleCommand({
                RoleArn: this.roleArn,
                RoleSessionName: `temp-session-${Date.now()}`,
                DurationSeconds: 3600,
            });
            const response = await this.stsClient.send(command);
            if (!response.Credentials) {
                throw new Error('Failed to obtain temporary credentials');
            }
            this.tempCredentials = {
                accessKeyId: response.Credentials.AccessKeyId,
                secretAccessKey: response.Credentials.SecretAccessKey,
                sessionToken: response.Credentials.SessionToken,
                expiration: response.Credentials.Expiration,
            };
            const refreshTime = this.calculateRefreshTime();
            setTimeout(() => {
                this.refreshCredentials();
            }, refreshTime);
        }
        catch (error) {
            console.error('Failed to refresh AWS credentials:', error);
            throw new common_1.InternalServerErrorException();
        }
    }
    calculateRefreshTime() {
        var _a;
        if (!((_a = this.tempCredentials) === null || _a === void 0 ? void 0 : _a.expiration)) {
            return this.CREDENTIALS_REFRESH_THRESHOLD;
        }
        const expirationTime = this.tempCredentials.expiration.getTime();
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;
        return Math.max(0, timeUntilExpiration - this.CREDENTIALS_REFRESH_THRESHOLD);
    }
    async getCredentials() {
        if (!this.tempCredentials) {
            await this.refreshCredentials();
        }
        else if (this.shouldRefreshCredentials()) {
            await this.refreshCredentials();
        }
        return this.tempCredentials;
    }
    shouldRefreshCredentials() {
        var _a;
        if (!((_a = this.tempCredentials) === null || _a === void 0 ? void 0 : _a.expiration)) {
            return true;
        }
        const currentTime = Date.now();
        const expirationTime = this.tempCredentials.expiration.getTime();
        return (expirationTime - currentTime) <= this.CREDENTIALS_REFRESH_THRESHOLD;
    }
};
exports.AwsCredentialsService = AwsCredentialsService;
exports.AwsCredentialsService = AwsCredentialsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], AwsCredentialsService);
//# sourceMappingURL=aws-credentials.service.js.map