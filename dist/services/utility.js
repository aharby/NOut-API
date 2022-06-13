"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityService = void 0;
const bcryptjs_1 = require("bcryptjs");
const uuid_1 = require("uuid");
const crypto = __importStar(require("crypto"));
const logger_1 = require("../config/logger");
/**
 * UtilityService
 *
 * Service for utility functions
 */
class UtilityService {
    /**
     * Error handler
     *
     * @param err
     * @returns
     */
    static handleError(err) {
        logger_1.logger.error(err.stack || err);
    }
    /**
     * Hash plain password
     *
     * @param plainPassword Password to hash
     * @returns hashed password
     */
    static hashPassword(plainPassword) {
        return new Promise((resolve, reject) => {
            bcryptjs_1.genSalt((err, salt) => {
                if (err) {
                    reject(err);
                }
                bcryptjs_1.hash(plainPassword, salt, (error, hashedVal) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(hashedVal);
                });
            });
        });
    }
    /**
     * Compares plain password with hashed password
     *
     * @param plainPassword Plain password to compare
     * @param hashedPassword Hashed password to compare
     * @returns whether passwords match
     */
    static verifyPassword(plainPassword, hashedPassword) {
        return new Promise((resolve, reject) => {
            bcryptjs_1.compare(plainPassword, hashedPassword, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    /**
     * Hash string with sha256 algorithm
     *
     * @param text String to hash
     * @returns Returns hashed string
     */
    static hashString(text) {
        return crypto.createHash('sha256').update(text).digest('hex');
    }
    /**
     * Generate UUID
     *
     * @returns UUID
     */
    static generateUuid() {
        return uuid_1.v1();
    }
}
exports.UtilityService = UtilityService;
//# sourceMappingURL=utility.js.map