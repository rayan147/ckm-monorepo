import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient, Prisma } from '@ckm/db';
import { LoggingService as Logger } from '../logging/logging.service';

const prismaClientExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    query: {
      async $allOperations({ operation, args, query }) {
        const start = performance.now();
        const logger = new Logger()


        logger.setContext('PrismaService Performance')
        logger.debug(`Operation: ${operation}`);
        logger.debug(`Arguments: ${JSON.stringify(args)}`);

        const result_1 = await query(args);
        const end = performance.now();
        const duration = end - start;
        logger.debug(`${operation} took ${duration.toFixed(2)}ms`);
        if (duration > 500) {
          logger.warn(`Slow query detected: ${operation} took ${duration.toFixed(2)}ms`);
        }
        return result_1;
      },
    },
  });
});

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly logger: Logger) {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });

    this.$extends(prismaClientExtension);
    this.logger.setContext(PrismaService.name)

  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma connected successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma disconnected successfully');
  }
}
