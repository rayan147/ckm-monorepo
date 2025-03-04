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
exports.LoggingService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
const db_1 = require("@ckm/db");
require("winston-daily-rotate-file");
let LoggingService = class LoggingService {
    constructor() {
        const dailyRotateFileTransport = new winston_1.transports.DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        });
        this.logger = (0, winston_1.createLogger)({
            level: 'info',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json({ space: 2 })),
            defaultMeta: { service: 'LoggingService' },
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
                }),
                dailyRotateFileTransport,
                new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }),
                new winston_1.transports.File({ filename: 'logs/combined.log' }),
            ],
        });
    }
    setContext(context) {
        this.context = context;
    }
    log(message, context) {
        this.logger.info(message, { context: context || this.context });
    }
    error(message, error, context) {
        this.logger.error(message, {
            context: context || this.context,
            error,
            stack: error === null || error === void 0 ? void 0 : error.stack,
        });
    }
    warn(message, context) {
        this.logger.warn(message, { context: context || this.context });
    }
    debug(message, context) {
        this.logger.debug(message, { context: context || this.context });
    }
    verbose(message, context) {
        this.logger.verbose(message, { context: context || this.context });
    }
    handleError(error, message) {
        if (error instanceof db_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                this.warn(`${message}: ${error.message}`, 'PrismaError');
                throw new common_1.NotFoundException('Resource not found');
            }
            this.error(`${message}: Prisma Error`, error.message, 'PrismaError');
            throw new common_1.BadRequestException(message);
        }
        if (error instanceof Error) {
            this.error(`${message}: Application Error`, error.message, 'ApplicationError');
            throw new common_1.InternalServerErrorException(message);
        }
        this.error(`${message}: Unknown Error`, new Error(String(error)), 'UnknownError');
        throw new common_1.InternalServerErrorException(message);
    }
};
exports.LoggingService = LoggingService;
exports.LoggingService = LoggingService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [])
], LoggingService);
//# sourceMappingURL=logging.service.js.map