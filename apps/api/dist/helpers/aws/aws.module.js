"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsModule = void 0;
const common_1 = require("@nestjs/common");
const s3_aws_service_1 = require("./s3.aws.service");
const kms_aws_service_1 = require("./kms.aws.service");
const env_service_1 = require("../../env/env.service");
const pinpoint_service_1 = require("./pinpoint.service");
const aws_credentials_service_1 = require("./aws-credentials.service");
let AwsModule = class AwsModule {
};
exports.AwsModule = AwsModule;
exports.AwsModule = AwsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [s3_aws_service_1.S3Service, kms_aws_service_1.KmsService, env_service_1.EnvService, pinpoint_service_1.PinpointService, aws_credentials_service_1.AwsCredentialsService],
        exports: [s3_aws_service_1.S3Service, kms_aws_service_1.KmsService, pinpoint_service_1.PinpointService, aws_credentials_service_1.AwsCredentialsService],
    })
], AwsModule);
//# sourceMappingURL=aws.module.js.map