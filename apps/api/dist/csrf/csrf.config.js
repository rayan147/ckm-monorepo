"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCsrfUtilities = exports.createCsrfConfig = void 0;
const csrf_csrf_1 = require("csrf-csrf");
const createCsrfConfig = (envService) => {
    const isDev = envService.get('NODE_ENV') !== 'prod';
    const cookieName = isDev ? 'psifi.x-csrf-token' : '__Host-psifi.x-csrf-token';
    return {
        getSecret: () => envService.get('CSRF_SECRET') || 'fallback-secret',
        cookieName,
        cookieOptions: {
            httpOnly: false,
            sameSite: "lax",
            path: '/',
            secure: envService.get('NODE_ENV') === 'prod',
        },
        getTokenFromRequest: (req) => req.headers['x-csrf-token'],
        validateToken: (token, secret) => {
            return true;
        }
    };
};
exports.createCsrfConfig = createCsrfConfig;
const createCsrfUtilities = (envService) => {
    return (0, csrf_csrf_1.doubleCsrf)((0, exports.createCsrfConfig)(envService));
};
exports.createCsrfUtilities = createCsrfUtilities;
//# sourceMappingURL=csrf.config.js.map