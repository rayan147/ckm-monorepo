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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const env_service_1 = require("../../env/env.service");
const aws_credentials_service_1 = require("./aws-credentials.service");
let S3Service = class S3Service {
    constructor(envService, awsCredentialsService) {
        this.envService = envService;
        this.awsCredentialsService = awsCredentialsService;
    }
    async onModuleInit() {
        await this.initalizeS3Client();
    }
    async initalizeS3Client() {
        const credentials = await this.awsCredentialsService.getCredentials();
        this.s3Client = new client_s3_1.S3Client({
            region: this.envService.get('AWS_REGION'),
            credentials: {
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
                sessionToken: credentials.sessionToken,
            },
        });
    }
    async uploadFile(bucketName, key, body) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: body,
            ACL: 'public-read'
        });
        await this.s3Client.send(command);
        return `https://${bucketName}.s3.amazonaws.com/${key}`;
    }
    async getSignedUrl(bucketName, key, expiresIn = 3600) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        });
        return (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
    }
    async deleteFile(bucketName, key) {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
        });
        await this.s3Client.send(command);
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService, aws_credentials_service_1.AwsCredentialsService])
], S3Service);
//# sourceMappingURL=s3.aws.service.js.map