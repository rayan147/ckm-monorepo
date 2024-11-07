"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().optional().default(3000),
    DATABASE_URL: zod_1.z.string().default('postgresql://ckm:ckm@localhost:5433/ckm?schema=public'),
    ENCRYPTION_PASSWORD: zod_1.z.string(),
    JWT_SECRET_KEY: zod_1.z.string(),
    AWS_REGION: zod_1.z.string(),
    AWS_ACCESS_KEY_ID: zod_1.z.string(),
    AWS_SECRET_ACCESS_KEY: zod_1.z.string(),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'performance']),
    AWS_SECRETS_NAME: zod_1.z.string(),
    PINPOINT_PROJECT_ID: zod_1.z.string(),
    PINPOINT_FROM_EMAIL: zod_1.z.string().email(),
    PINPOINT_SMS_SENDER_ID: zod_1.z.string(),
    SMS_POOL_ORIGINATION_NUMBER: zod_1.z.string(),
    CORS_ORIGIN: zod_1.z.enum([
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:5176',
        'https://ckm.rayanr.com',
        'http://10.0.0.18',
        '*',
    ]).default('http://localhost:5175'),
    KMS_CUSTOMER_KEY: zod_1.z.string(),
    OPENAI_API_KEY: zod_1.z.string(),
    RECIPE_IMAGES_BUCKET: zod_1.z.string(),
});
//# sourceMappingURL=env.js.map