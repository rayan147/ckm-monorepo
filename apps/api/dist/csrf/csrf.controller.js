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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrfController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../decorators/public.decorator");
const csrf_service_1 = require("./csrf.service");
let CsrfController = class CsrfController {
    constructor(csrfService) {
        this.csrfService = csrfService;
    }
    getCsrfToken(req, res) {
        var _a;
        const token = this.csrfService.generateCsrfToken(req);
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.csrfToken) {
            req.session.csrfToken = token;
        }
        return { csrfToken: token };
    }
};
exports.CsrfController = CsrfController;
__decorate([
    (0, common_1.Get)('csrf-token'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CsrfController.prototype, "getCsrfToken", null);
exports.CsrfController = CsrfController = __decorate([
    (0, common_1.Controller)('csrf'),
    __metadata("design:paramtypes", [csrf_service_1.CsrfService])
], CsrfController);
//# sourceMappingURL=csrf.controller.js.map