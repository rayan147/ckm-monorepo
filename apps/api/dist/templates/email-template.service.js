"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateService = void 0;
const common_1 = require("@nestjs/common");
const password_rest_template_1 = require("./emails/password-rest.template");
const verfication_code_template_1 = require("./emails/verfication-code.template");
let EmailTemplateService = class EmailTemplateService {
    getPasswordResetTemplate(resetLink) {
        return password_rest_template_1.passwordResetTemplate.replace(/{{resetLink}}/g, resetLink);
    }
    getVerificationCodeTemplate(verificationCode) {
        return verfication_code_template_1.verificationCodeTemplate.replace(/{{verificationCode}}/g, verificationCode);
    }
};
exports.EmailTemplateService = EmailTemplateService;
exports.EmailTemplateService = EmailTemplateService = __decorate([
    (0, common_1.Injectable)()
], EmailTemplateService);
//# sourceMappingURL=email-template.service.js.map