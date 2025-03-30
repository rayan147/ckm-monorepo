import { Injectable } from '@nestjs/common';
import { passwordResetTemplate } from './emails/password-rest.template';
import { verificationCodeTemplate } from './emails/verfication-code.template';

@Injectable()
export class EmailTemplateService {
  getPasswordResetTemplate(resetLink: string): string {
    return passwordResetTemplate.replace(/{{resetLink}}/g, resetLink);
  }

  getVerificationCodeTemplate(verificationCode: string): string {
    return verificationCodeTemplate.replace(
      /{{verificationCode}}/g,
      verificationCode,
    );
  }
}
