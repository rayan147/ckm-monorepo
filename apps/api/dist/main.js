"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const env_service_1 = require("./env/env.service");
const swagger_1 = require("@nestjs/swagger");
const language_interceptor_1 = require("./i18n/language.interceptor");
const i18n_service_1 = require("./i18n/i18n.service");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    app.useGlobalInterceptors(new language_interceptor_1.LanguageInterceptor(app.get(i18n_service_1.I18nService)));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('CKM API')
        .setDescription('Cloud based kitchen management server ')
        .setVersion('1.0')
        .addTag('CKM')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use((0, helmet_1.default)());
    app.use((0, cookie_parser_1.default)());
    const configService = app.get(env_service_1.EnvService);
    const port = configService.get('PORT');
    const corsOrigin = configService.get('CORS_ORIGIN');
    app.enableCors({
        origin: corsOrigin === '*' ? '*' : corsOrigin.split(','),
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'x-csrf-token'],
        exposedHeaders: ['set-cookie'],
    });
    app.use(express_1.default.urlencoded({ extended: true, limit: '1kb' }));
    app.use(express_1.default.json({ limit: '1kb' }));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map