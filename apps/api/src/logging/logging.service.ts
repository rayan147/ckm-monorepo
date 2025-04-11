import {
  Injectable,
  Scope,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';
import { Prisma } from '@ckm/db';
import 'winston-daily-rotate-file';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService {
  private logger: Logger;
  private context?: string;

  constructor() {
    const dailyRotateFileTransport = new transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d', // Keep logs for 14 days
    });
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json({ space: 2 }),
      ),
      defaultMeta: { service: 'LoggingService' },
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
        dailyRotateFileTransport, // Add daily rotate file transport
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: any, context?: string) {
    this.logger.info(message, { context: context || this.context });
  }

  error(message: any, error?: Error, context?: string) {
    this.logger.error(message, {
      context: context || this.context,
      error,
      stack: error?.stack,
    });
  }

  warn(message: any, context?: string) {
    this.logger.warn(message, { context: context || this.context });
  }

  debug(message: any, context?: string) {
    this.logger.debug(message, { context: context || this.context });
  }

  verbose(message: any, context?: string) {
    this.logger.verbose(message, { context: context || this.context });
  }

  handleError(error: unknown, message: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        this.warn(`${message}: ${error.message}`, 'PrismaError');
        throw new NotFoundException('Resource not found');
      }
      this.error(`${message}: Prisma Error`, error.message as any, 'PrismaError');
      throw new BadRequestException(message);
    }
    if (error instanceof Error) {
      this.error(`${message}: Application Error`, error.message as any, 'ApplicationError');
      throw new InternalServerErrorException(message);
    }
    this.error(`${message}: Unknown Error`, new Error(String(error)), 'UnknownError');
    throw new InternalServerErrorException(message);
  }
}
