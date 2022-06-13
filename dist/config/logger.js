"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const winston_1 = require("winston");
const globals_1 = require("./globals");
const logDir = 'logs';
// Create the log directory if it does not exist
if (!fs_1.existsSync(logDir)) {
    fs_1.mkdirSync(logDir);
}
const errorLog = path_1.join(logDir, 'error.log');
const combinedLog = path_1.join(logDir, 'combined.log');
const exceptionsLog = path_1.join(logDir, 'exceptions.log');
exports.logger = winston_1.createLogger({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
    transports: [
        new winston_1.transports.File({
            filename: errorLog,
            level: 'error'
        }),
        new winston_1.transports.File({
            filename: combinedLog
        })
    ],
    exceptionHandlers: [
        new winston_1.transports.File({
            filename: exceptionsLog
        })
    ]
});
if (globals_1.env.NODE_ENV !== 'production') {
    exports.logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
        level: 'debug'
    }));
}
//# sourceMappingURL=logger.js.map