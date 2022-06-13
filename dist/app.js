"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// Set env variables from .env file
const dotenv_1 = require("dotenv");
dotenv_1.config();
const http_1 = require("http");
const typeorm_1 = require("typeorm");
const globals_1 = require("./config/globals");
const logger_1 = require("./config/logger");
const server_1 = require("./api/server");
const redis_1 = require("./services/redis");
// Startup
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect db
            logger_1.logger.info('Initializing ORM connection...');
            const connection = yield typeorm_1.createConnection();
            // Connect redis
            //RedisService.connect();
            // Init express server
            const app = new server_1.Server().app;
            const server = http_1.createServer(app);
            // Start express server
            server.listen(globals_1.env.NODE_PORT);
            server.on('listening', () => {
                logger_1.logger.info(`node server is listening on port ${globals_1.env.NODE_PORT} in ${globals_1.env.NODE_ENV} mode`);
            });
            server.on('close', () => {
                connection.close();
                redis_1.RedisService.disconnect();
                logger_1.logger.info('node server closed');
            });
        }
        catch (err) {
            logger_1.logger.error(err.stack);
        }
    });
})();
//# sourceMappingURL=app.js.map