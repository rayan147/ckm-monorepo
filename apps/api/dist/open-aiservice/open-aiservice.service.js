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
exports.OpenAiserviceService = void 0;
const common_1 = require("@nestjs/common");
const env_service_1 = require("../env/env.service");
const openai_1 = require("openai");
const logging_service_1 = require("../logging/logging.service");
let OpenAiserviceService = class OpenAiserviceService {
    constructor(envSerivce, logger) {
        this.envSerivce = envSerivce;
        this.logger = logger;
        this.logger.setContext('OpenAiserviceService');
        this.openai = new openai_1.OpenAI({
            apiKey: this.envSerivce.get('OPENAI_API_KEY'),
        });
    }
    async generateResponse(prompt) {
        try {
            const params = {
                messages: [{ role: 'user', content: prompt }],
                model: 'gpt-3.5-turbo',
            };
            const chatCompletion = await this.openai.chat.completions.create(params);
            if (!chatCompletion) {
                return undefined;
            }
            return chatCompletion;
        }
        catch (error) {
            this.logger.handleError(error, `#generateResponse`);
        }
    }
};
exports.OpenAiserviceService = OpenAiserviceService;
exports.OpenAiserviceService = OpenAiserviceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService,
        logging_service_1.LoggingService])
], OpenAiserviceService);
//# sourceMappingURL=open-aiservice.service.js.map