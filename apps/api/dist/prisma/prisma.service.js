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
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("@ckm/db");
const logging_service_1 = require("../logging/logging.service");
const prismaClientExtension = db_1.Prisma.defineExtension(client => {
    return client.$extends({
        query: {
            async $allOperations({ operation, args, query }) {
                const start = performance.now();
                const logger = new logging_service_1.LoggingService();
                logger.setContext('PrismaService Performance');
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
let PrismaService = PrismaService_1 = class PrismaService extends db_1.PrismaClient {
    constructor(logger) {
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
        this.logger = logger;
        this.$extends(prismaClientExtension);
        this.logger.setContext(PrismaService_1.name);
    }
    async onModuleInit() {
        await this.$connect();
        this.logger.log('Prisma connected successfully');
    }
    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Prisma disconnected successfully');
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logging_service_1.LoggingService])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map