"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nService = void 0;
const common_1 = require("@nestjs/common");
const i18n_message_1 = require("./i18n.message");
let I18nService = class I18nService {
    constructor() {
        this.language = 'en';
    }
    setLanguage(lang) {
        this.language = lang;
    }
    translate(key) {
        const keys = key.split('.');
        let translated = i18n_message_1.messages[this.language];
        for (const k of keys) {
            if (translated[k] === undefined) {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
            translated = translated[k];
        }
        return translated;
    }
};
exports.I18nService = I18nService;
exports.I18nService = I18nService = __decorate([
    (0, common_1.Injectable)()
], I18nService);
//# sourceMappingURL=i18n.service.js.map