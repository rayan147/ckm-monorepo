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
exports.LanguageInterceptor = void 0;
const common_1 = require("@nestjs/common");
const i18n_service_1 = require("./i18n.service");
let LanguageInterceptor = class LanguageInterceptor {
    constructor(i18nService) {
        this.i18nService = i18nService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const acceptLanguage = request.headers['accept-language'];
        const language = (acceptLanguage === null || acceptLanguage === void 0 ? void 0 : acceptLanguage.startsWith('es')) ? 'es' : 'en';
        this.i18nService.setLanguage(language);
        return next.handle();
    }
};
exports.LanguageInterceptor = LanguageInterceptor;
exports.LanguageInterceptor = LanguageInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [i18n_service_1.I18nService])
], LanguageInterceptor);
//# sourceMappingURL=language.interceptor.js.map