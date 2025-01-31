"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCsrfUtilities = void 0;
const csrf_csrf_1 = require("csrf-csrf");
const createCsrfUtilities = (envService) => {
    return (0, csrf_csrf_1.doubleCsrf)({
        getSecret: () => envService.get('CSRF_SECRET') || 'fallback-secret',
        cookieName: '__Host-psifi.x-csrf-token',
        cookieOptions: {
            httpOnly: false,
            sameSite: 'lax',
            path: '/',
            secure: envService.get('NODE_ENV') === 'prod',
        },
        getTokenFromRequest: (req) => req.headers['x-csrf-token'],
    });
};
exports.createCsrfUtilities = createCsrfUtilities;
//# sourceMappingURL=csrf.config.js.map