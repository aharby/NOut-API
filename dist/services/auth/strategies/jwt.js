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
exports.JwtStrategy = void 0;
const decko_1 = require("decko");
const passport_1 = require("passport");
const passport_jwt_1 = require("passport-jwt");
const base_1 = require("./base");
/**
 * Passport JWT Authentication
 *
 * - The client signs in via /signin endpoint
 * - If the signin is successfull a JWT is returned
 * - This JWT is used inside the request header for later requests
 */
class JwtStrategy extends base_1.BaseStrategy {
    constructor(strategyOptions) {
        super();
        this.strategyOptions = strategyOptions;
        this._strategy = new passport_jwt_1.Strategy(this.strategyOptions, this.verify);
    }
    /**
     * Middleware for checking if a user is authorized to access the endpoint
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns Returns if user is authorized
     */
    isAuthorized(req, res, next) {
        try {
            passport_1.authenticate('jwt', { session: false }, (err, user, info) => {
                // internal error
                if (err) {
                    return next(err);
                }
                if (info) {
                    switch (info.message) {
                        case 'No auth token':
                            return res.status(401).json({
                                error: 'No jwt provided!'
                            });
                        case 'jwt expired':
                            return res.status(401).json({
                                error: 'Jwt expired!'
                            });
                    }
                }
                if (!user) {
                    return res.status(401).json({
                        error: 'User is not authorized!'
                    });
                }
                // success - store user in req scope
                req.user = user;
                return next();
            })(req, res, next);
        }
        catch (err) {
            return next(err);
        }
    }
    /**
     * Verify incoming payloads from request -> validation in isAuthorized()
     *
     * @param payload JWT payload
     * @param next Express next
     * @returns
     */
    verify(payload, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // pass error == null on error otherwise we get a 500 error instead of 401
                const user = yield this.userRepo.findOne({
                    where: {
                        active: true,
                        id: payload.userID
                    }
                });
                if (!user) {
                    return next(null, null);
                }
                //	await this.setPermissions(user);
                return next(null, user);
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JwtStrategy.prototype, "verify", null);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.js.map