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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const globals_1 = require("../config/globals");
const redis_1 = require("../services/redis");
/**
 * TestFactory
 * - Loaded in each unit test
 * - Starts server and DB connection
 */
class TestFactory {
    constructor() {
        this._app = express_1.default();
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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // logger.info('Running startup for test case');
            yield this.startup();
        });
    }
    /**
     * Close DB connection
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this._connection.close();
            redis_1.RedisService.disconnect();
        });
    }
    /**
     * Connect to DB and start express app
     */
    startup() {
        return __awaiter(this, void 0, void 0, function* () {
            this._connection = yield typeorm_1.createConnection(this.options);
            redis_1.RedisService.connect();
            this._app.listen(globals_1.env.NODE_PORT);
        });
    }
}
exports.TestFactory = TestFactory;
//# sourceMappingURL=factory.js.map