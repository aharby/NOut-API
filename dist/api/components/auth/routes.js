"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../../services/auth");
const controller_1 = require("./controller");
class AuthRoutes {
    constructor(defaultStrategy) {
        this.name = 'auth';
        this.controller = new controller_1.AuthController();
        this.router = express_1.Router();
        this.authSerivce = new auth_1.AuthService(defaultStrategy);
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/signin', express_validator_1.body('email').isEmail(), express_validator_1.body('password').isString(), this.authSerivce.validateRequest, this.controller.signinUser);
        this.router.post('/register', express_validator_1.body('email').isEmail(), express_validator_1.body('firstname').isString(), express_validator_1.body('lastname').isString(), express_validator_1.body('password').isString(), express_validator_1.body('co').isString(), express_validator_1.body('street').isString(), express_validator_1.body('hauseNr').isString(), express_validator_1.body('zip').isString(), express_validator_1.body('city').isString(), express_validator_1.body('country').isString(), this.authSerivce.validateRequest, this.controller.registerUser);
        this.router.post('/unregister', this.authSerivce.isAuthorized(), this.controller.unregisterUser);
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=routes.js.map