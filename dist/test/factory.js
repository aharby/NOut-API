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
exports.TestFactory = void 0;
require("reflect-metadata");
// Set env to test
process.env.NODE_ENV = 'test';
// Set env variables from .env file
const dotenv_1 = require("dotenv");
dotenv_1.config();
const typeorm_1 = require("typeorm");
const http_1 = require("http");
const supertest_1 = __importDefault(require("supertest"));
const globals_1 = require("../config/globals");
const server_1 = require("../api/server");
const redis_1 = require("../services/redis");
/**
 * TestFactory
 * - Loaded in each unit test
 * - Starts server and DB connection
 */
class TestFactory {
    constructor() {
        // DB connection options
        this.options = {
            type: 'sqljs',
            database: new Uint8Array(),
            location: 'database',
            logging: false,
            synchronize: true,
            entities: ['dist/api/components/**/model.js']
        };
    }
    get app() {
        return supertest_1.default(this._app);
    }
    get connection() {
        return this._connection;
    }
    get server() {
        return this._server;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // logger.info('Running startup for test case');
            yield this.startup();
        });
    }
    /**
     * Close server and DB connection
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this._server.close();
            this._connection.close();
            redis_1.RedisService.disconnect();
        });
    }
    /**
     * Connect to DB and start server
     */
    startup() {
        return __awaiter(this, void 0, void 0, function* () {
            this._connection = yield typeorm_1.createConnection(this.options);
            redis_1.RedisService.connect();
            this._app = new server_1.Server().app;
            this._server = http_1.createServer(this._app).listen(globals_1.env.NODE_PORT);
        });
    }
}
exports.TestFactory = TestFactory;
//# sourceMappingURL=factory.js.map