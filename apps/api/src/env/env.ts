import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  DATABASE_URL: z.string().default('postgresql://ckm:ckm@localhost:5433/ckm?schema=public'),
  ENCRYPTION_PASSWORD: z.string(),
  JWT_SECRET_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  NODE_ENV: z.enum(['dev', 'prod', 'staging']),
  AWS_SECRETS_NAME: z.string(),
  PINPOINT_PROJECT_ID: z.string(),
  PINPOINT_FROM_EMAIL: z.string().email(),
  PINPOINT_SMS_SENDER_ID: z.string(),
  SMS_POOL_ORIGINATION_NUMBER: z.string(),
  CORS_ORIGIN: z
    .enum([
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5175',
      'http://localhost:5176',
      'https://ckm.rayanr.com',
      'http://10.0.0.8',
      '*',
    ])
    .default('http://localhost:5175'),
  KMS_CUSTOMER_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
  RECIPE_IMAGES_BUCKET: z.string(),
  AWS_ROLE_ARN: z.string(),
  CSRF_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
  USDA_API_KEY: z.string(),
  BASE_URL: z.string().default('https://ckm.rayanr.com'),
  BASE_URL_DEV: z.string().default('http://localhost'),
});

export type Env = z.infer<typeof envSchema>;
