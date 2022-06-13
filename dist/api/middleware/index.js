"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerErrorHandler = exports.registerMiddleware = void 0;
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = require("express");
const auth_1 = require("../../services/auth");
const utility_1 = require("../../services/utility");
const globals_1 = require("../../config/globals");
/**
 * Init Express middleware
 *
 * @param {Router} router
 * @returns {void}
 */
function registerMiddleware(router) {
    router.use(helmet_1.default());
    if (globals_1.env.NODE_ENV === 'development') {
        router.use(cors_1.default({ origin: '*' }));
    }
    else {
        router.use(cors_1.default({ origin: ['http://localhost:4200'] }));
    }
    router.use(express_1.json());
    router.use(compression_1.default());
    // Setup passport strategies
    new auth_1.AuthService().initStrategies();
}
exports.registerMiddleware = registerMiddleware;
/**
 * Init Express error handler
 *
 * @param {Router} router
 * @returns {void}
 */
function registerErrorHandler(router) {
    router.use((err, req, res, next) => {
        utility_1.UtilityService.handleError(err);
        return res.status(500).json({
            error: err.message || err,
            status: 500
        });
    });
}
exports.registerErrorHandler = registerErrorHandler;
//# sourceMappingURL=index.js.map