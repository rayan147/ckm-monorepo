import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { EarlyAccessService } from './early-access.service';
import { LoggingService } from '../logging/logging.service';
import { EarlyAccess } from '@ckm/db';

@TsRest({ jsonQuery: true })
@Controller()
export class EarlyAccessController {
  constructor(
    private readonly earlyAccessService: EarlyAccessService,
    private readonly logger: LoggingService,
  ) {}

  @TsRestHandler(contract.earlyAccess.storeEmail)
  async storeEmail() {
    return tsRestHandler(contract.earlyAccess.storeEmail, async ({ body }) => {
      this.logger.log('Received request to store an email');
      const emails = await this.earlyAccessService.storeEmail(body.email);
      return { status: 201, body: emails };
    });
  }

  @TsRestHandler(contract.earlyAccess.getEmails)
  async getEmails() {
    return tsRestHandler(contract.earlyAccess.getEmails, async ({ query }) => {
      this.logger.log('Received request to get all emails');
      const emails = await this.earlyAccessService.getEmails({
        skip: query.skip ? parseInt(query.skip) : undefined,
        take: query.take ? parseInt(query.take) : undefined,
        orderBy: query.orderBy as keyof EarlyAccess | undefined,
        isEmailSent: query.isEmailSent ? query.isEmailSent : undefined,
      });
      return { status: 201, body: emails };
    });
  }

  @TsRestHandler(contract.earlyAccess.deleteEmail)
  async deleteEmails() {
    return tsRestHandler(
      contract.earlyAccess.deleteEmail,
      async ({ params }) => {
        this.logger.log('Received request to delete an email');
        const emails = await this.earlyAccessService.deleteEmail(params.id);
        return { status: 201, body: emails };
      },
    );
  }

  @TsRestHandler(contract.earlyAccess.getEmail)
  async get() {
    return tsRestHandler(contract.earlyAccess.getEmail, async ({ params }) => {
      this.logger.log('Received request to get an email');
      const emails = await this.earlyAccessService.getEmail(params.id);
      return { status: 201, body: emails };
    });
  }
} //end region
