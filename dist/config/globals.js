"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mails = exports.env = void 0;
// Environment variables imported from .env file
exports.env = {
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    NODE_ENV: process.env.NODE_ENV || 'development',
    NODE_PORT: process.env.PORT || 3000,
    DOMAIN: process.env.DOMAIN,
    SMTP: {
        auth: {
            pass: process.env.SMTP_PASSWORD || '',
            user: process.env.SMTP_USERNAME || ''
        },
        host: process.env.SMTP_HOST || '',
        port: process.env.SMTP_PORT || '',
        tls: {
            rejectUnauthorized: false
        }
    }
};
exports.mails = {
    support: 'support@my-company.com'
};
//# sourceMappingURL=globals.js.map