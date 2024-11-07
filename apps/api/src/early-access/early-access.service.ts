import { zodSchemas } from '@ckm/db';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PinpointService } from '../pinpoint/pinpoint.service';
import { EarlyAccess,  } from '@ckm/db';
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
    // Load the email template
    this.earlyAccessTemplate = fs.readFileSync(
      path.join(
        process.cwd(),
        './src/early-access/templates/early-access-email.html',
      ),
      'utf8',
    );
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
