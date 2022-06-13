"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.AuthService = void 0;
const decko_1 = require("decko");
const jsonwebtoken_1 = require("jsonwebtoken");
const passport_1 = require("passport");
const passport_jwt_1 = require("passport-jwt");
const express_validator_1 = require("express-validator");
const globals_1 = require("../../config/globals");
const model_1 = require("../../api/components/user/model");
const jwt_1 = require("./strategies/jwt");
/**
 * AuthService
 *
 * Available passport strategies for authentication:
 *  - JWT (default)
 *
 * Pass a strategy when initializing module routes to setup this strategy for the complete module: Example: new UserRoutes('jwt')
 *
 * To setup a strategy for individual endpoints in a module pass the strategy on isAuthorized call
 * Example: isAuthorized('basic')
 */
class AuthService {
    constructor(defaultStrategy = 'jwt') {
        this.strategyOptions = {
            audience: 'expressjs-api-client',
            issuer: 'expressjs-api',
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'my-super-secret-key'
        };
        // JWT options
        this.signOptions = {
            audience: this.strategyOptions.audience,
            expiresIn: '8h',
            issuer: this.strategyOptions.issuer
        };
        // Setup default strategy -> use jwt if none is provided
        this.defaultStrategy = defaultStrategy;
        this.jwtStrategy = new jwt_1.JwtStrategy(this.strategyOptions);
    }
    /**
     * Create JWT
     *
     * @param userID Used for JWT payload
     * @returns Returns JWT
     */
    createToken(userID) {
        return jsonwebtoken_1.sign({ userID }, this.strategyOptions.secretOrKey, this.signOptions);
    }
    /**
     * Middleware for verifying user permissions from acl
     *
     * @param resource Requested resource
     * @param action Performed action on requested resource
     * @returns Returns if action on resource is allowed
     */
    hasPermission(resource, action) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.user;
                const access = true;
                if (!access) {
                    return res.status(403).json({
                        error: 'Missing user rights!'
                    });
                }
                return next();
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Init passport strategies
     *
     * @returns
     */
    initStrategies() {
        passport_1.use('jwt', this.jwtStrategy.strategy);
    }
    /**
     * Setup target passport authorization
     *
     * @param strategy Passport strategy
     * @returns Returns if user is authorized
     */
    isAuthorized(strategy) {
        return (req, res, next) => {
            try {
                if (globals_1.env.NODE_ENV !== 'test') {
                    // if no strategy is provided use default strategy
                    const tempStrategy = strategy || this.defaultStrategy;
                    return this.doAuthentication(req, res, next, tempStrategy);
                }
                // Mock user
                const testUser = model_1.User.mockTestUser();
                req.user = testUser;
                //	policy.addUserRoles(testUser.id, testUser.userRole.name);
                return next();
            }
            catch (err) {
                return next(err);
            }
        };
    }
    validateRequest(req, res, next) {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        return next();
    }
    /**
     * Executes the target passport authorization
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @param strategy Passport strategy name
     * @returns Returns if user is authorized
     */
    doAuthentication(req, res, next, strategy) {
        try {
            switch (strategy) {
                case 'jwt':
                    return this.jwtStrategy.isAuthorized(req, res, next);
                default:
                    throw new Error(`Unknown passport strategy: ${strategy}`);
            }
        }
        catch (err) {
            return next(err);
        }
    }
}
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Function)
], AuthService.prototype, "isAuthorized", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
], AuthService.prototype, "validateRequest", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, String]),
    __metadata("design:returntype", Object)
], AuthService.prototype, "doAuthentication", null);
exports.AuthService = AuthService;
//# sourceMappingURL=index.js.map