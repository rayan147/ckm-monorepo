"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../guards/jwt.auth.guard");
const role_guard_1 = require("../guards/role.guard");
function Auth(...roles) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('roles', roles), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard));
}
//# sourceMappingURL=auth.decorator.js.map