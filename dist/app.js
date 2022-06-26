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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// Set env variables from .env file
const dotenv_1 = require("dotenv");
dotenv_1.config();
const express_1 = __importDefault(require("express"));
const routes_1 = require("./api/routes");
const typeorm_1 = require("typeorm");
const globals_1 = require("./config/globals");
const logger_1 = require("./config/logger");
const redis_1 = require("./services/redis");
// Startup
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect db
            console.log('Initializing ORM connection...');
            const connection = yield typeorm_1.createConnection();
            // Connect redis
            redis_1.RedisService.connect();
            // Init express app and routes
            const app = express_1.default();
            routes_1.initRestRoutes(app);
            const port = globals_1.env.NODE_PORT;
            app.listen(port, () => {
                logger_1.logger.info(`Example app listening on port ${port} in ${globals_1.env.NODE_ENV} mode`);
                console.log(`Example app listening on port ${port} in ${globals_1.env.NODE_ENV} mode`);
            });
        }
        catch (err) {
            logger_1.logger.error(err.stack);
        }
    });
})();
//# sourceMappingURL=app.js.map