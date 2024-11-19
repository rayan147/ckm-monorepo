import { zodSchemas } from '@ckm/db';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PinpointService } from '../pinpoint/pinpoint.service';
import { EarlyAccess, } from '@ckm/db';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggingService } from 'src/logging/logging.service';
import fs from 'fs';
import path from 'path';

@Injectable()
export class EarlyAccessService {
  private readonly earlyAccessTemplate: string;
  constructor(
    private pinPointService: PinpointService,
    private prisma: PrismaService,
    private logger: LoggingService,
  ) {
    // Embed the email template directly into the codebase
    this.earlyAccessTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to CKM Early Access</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding-bottom: 30px;">
                            <img src="https://example.com/ckm-logo.png" alt="CKM Logo" style="max-width: 150px; height: auto;">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h1 style="color: #4a5568; text-align: center; margin-bottom: 30px; font-size: 28px;">Welcome to CKM Early Access!</h1>
                            <p style="margin-bottom: 20px; font-size: 16px;">Hello,</p>
                            <p style="margin-bottom: 20px; font-size: 16px;">Thank you for your interest in Cloud-based Kitchen Management (CKM). We're thrilled to have you join our early access program!</p>
                            <p style="margin-bottom: 30px; font-size: 16px;">Your email {{email}} has been successfully added to our list. Here's what you can expect:</p>
                            <ul style="margin-bottom: 30px; font-size: 16px;">
                                <li>Exclusive first look at CKM's AI-driven kitchen management features</li>
                                <li>Opportunity to provide feedback and shape the future of the product</li>
                                <li>Early adopter benefits and special pricing offers</li>
                                <li>Regular updates on new features and improvements</li>
                            </ul>
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="https://app.ckm.com/early-access" style="background-color: #4299e1; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 18px; display: inline-block;">Access Your Demo</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin-top: 30px; font-size: 16px;">We're excited to revolutionize kitchen management together. Your insights and feedback will be invaluable in creating a tool that truly meets the needs of modern kitchens.</p>
                            <p style="margin-top: 30px; font-size: 16px;">If you have any questions or ideas, please don't hesitate to reach out to our team at <a href="mailto:support@ckm.com" style="color: #4299e1; text-decoration: none;">support@ckm.com</a>.</p>
                            <p style="margin-top: 30px; font-size: 16px;">Best regards,<br>The CKM Team</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="background-color: #4a5568; color: #ffffff; text-align: center; padding: 20px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                <p style="margin: 0; font-size: 14px;">&copy; 2024 Cloud-based Kitchen Management. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
  }
  async storeEmail(email: string): Promise<EarlyAccess | null> {
    try {
      const hasEmail = await this.prisma.earlyAccess.findUnique({
        where: { email },
      });

      if (hasEmail) {
        return null;
      }

      const storeEmail = await this.prisma.earlyAccess.create({
        data: { email, isEmailSent: false },
      });

      if (!storeEmail) throw new BadRequestException();

      const htmlBody = this.earlyAccessTemplate.replace(
        /{{email}}/g,
        storeEmail.email,
      );

      const sendEmail = await this.pinPointService.sendEmail(
        email,
        'Welcome to CKM Early Access',
        htmlBody,
      );

      if (sendEmail) {
        await this.prisma.earlyAccess.update({
          where: { id: storeEmail.id },
          data: { isEmailSent: true },
        });
      }

      return storeEmail;
    } catch (error) {
      this.logger.handleError(`could not store the email ${error}`, `error`);
    }
  }
  async getEmails(params: {
    skip?: number;
    take?: number;
    orderBy?: keyof EarlyAccess;
    isEmailSent?: boolean;
  }): Promise<EarlyAccess[]> {
    const { skip, take, orderBy, isEmailSent } = params;

    try {
      const emails = await this.prisma.earlyAccess.findMany({
        skip,
        take,
        orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
      });

      if (!emails) throw BadRequestException;

      return emails;
    } catch (error) {
      this.logger.handleError(`This is  getEmails ${error}`, `getEmail`);
    }
  }

  async getEmail(id: number): Promise<EarlyAccess | null> {
    try {
      return await this.prisma.earlyAccess.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.handleError(`Error ${error}`, `getEmail`);
    }
  }

  async deleteEmail(id: number): Promise<EarlyAccess> {
    try {
      return await this.prisma.earlyAccess.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.handleError(`Error ${error}`, `deleteEmail`);
    }
  }
} // end of region
