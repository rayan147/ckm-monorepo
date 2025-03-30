"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const role_guard_1 = require("../guards/role.guard");
const auth_session_guard_1 = require("../guards/auth.session.guard");
const csrf_guard_1 = require("../csrf/csrf.guard");
function Auth(...roles) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('roles', roles), (0, common_1.UseGuards)(auth_session_guard_1.SessionAuthGuard, role_guard_1.RoleGuard, csrf_guard_1.CsrfGuard));
}
//# sourceMappingURL=auth.decorator.js.map