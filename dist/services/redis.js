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
exports.RedisService = void 0;
const redis_1 = require("redis");
const globals_1 = require("../config/globals");
const logger_1 = require("../config/logger");
class RedisService {
    /**
     * Connect to Redis
     */
    static connect() {
        this.client = redis_1.createClient({
            url: globals_1.env.REDIS_URL,
            password: globals_1.env.REDIS_PASSWORD
        });
    }
    /**
     * Disconnect from Redis
     */
    static disconnect() {
        this.client.end(true);
    }
    /**
     * Get object as instance of given type
     *
     * @param key Cache key
     * @returns Object
     */
    static getObject(key) {
        return new Promise((resolve, reject) => {
            return RedisService.client.get(key, (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data === null)
                    resolve(null);
                return resolve(JSON.parse(data));
            });
        });
    }
    /**
     * Store object
     *
     * @param key Cache Key
     * @param obj Object to store
     */
    static setObject(key, obj) {
        RedisService.client.set(key, JSON.stringify(obj), (err) => {
            if (err)
                logger_1.logger.error(err);
        });
    }
    /**
     * Get object as instance of given type and store if not existing in cache
     *
     * @param key Cache Key
     * @param fn Function to fetch data if not existing
     * @returns Object
     */
    static getAndSetObject(key, fn) {
        return new Promise((resolve, reject) => {
            return RedisService.client.get(key, (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject(err);
                }
                // Fetch from db and store in cache
                if (data === null) {
                    const fetched = yield fn();
                    this.setObject(key, fetched);
                    return resolve(fetched);
                }
                return resolve(JSON.parse(data));
            }));
        });
    }
    /**
     * Delete entry by key
     *
     * @param key Cache key
     */
    static deleteByKey(key) {
        RedisService.client.del(key);
    }
}
exports.RedisService = RedisService;
//# sourceMappingURL=redis.js.map