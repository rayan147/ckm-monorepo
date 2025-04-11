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
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const util_1 = require("util");
const env_service_1 = require("../../env/env.service");
const logging_service_1 = require("../../logging/logging.service");
let EncryptionService = class EncryptionService {
    constructor(envService, logger) {
        this.envService = envService;
        this.logger = logger;
        this.logger.setContext('EncryptionService');
    }
    async encrypt(text) {
        try {
            const iv = (0, crypto_1.randomBytes)(16);
            const password = this.envService.get('ENCRYPTION_PASSWORD');
            const key = (await (0, util_1.promisify)(crypto_1.scrypt)(password, 'salt', 32));
            const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
            const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);
            return `${iv.toString('hex')}:${encryptedText.toString('hex')}`;
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to encrypt text');
        }
    }
    async decrypt(encryptedText) {
        try {
            const [ivHex, textHex] = encryptedText.split(':');
            const iv = Buffer.from(ivHex, 'hex');
            const password = this.envService.get('ENCRYPTION_PASSWORD');
            const key = (await (0, util_1.promisify)(crypto_1.scrypt)(password, 'salt', 32));
            const decipher = (0, crypto_1.createDecipheriv)('aes-256-ctr', key, iv);
            const decryptedText = Buffer.concat([
                decipher.update(Buffer.from(textHex, 'hex')),
                decipher.final(),
            ]);
            return decryptedText.toString();
        }
        catch (error) {
            this.logger.handleError(error, 'Failed to decrypt text');
        }
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService,
        logging_service_1.LoggingService])
], EncryptionService);
//# sourceMappingURL=encryption.service.js.map