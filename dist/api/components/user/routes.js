"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../../services/auth");
const controller_1 = require("./controller");
class UserRoutes {
    constructor(defaultStrategy) {
        this.name = 'user';
        this.controller = new controller_1.UserController();
        this.router = express_1.Router();
        this.authSerivce = new auth_1.AuthService(defaultStrategy);
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.authSerivce.isAuthorized(), this.authSerivce.hasPermission(this.name, 'read'), this.controller.readUsers);
        this.router.get('/search', this.authSerivce.isAuthorized(), this.authSerivce.hasPermission(this.name, 'read'), express_validator_1.query('email').isString(), this.authSerivce.validateRequest, this.controller.readUserByEmail);
        this.router.get('/:userID', this.authSerivce.isAuthorized(), this.authSerivce.hasPermission(this.name, 'read'), express_validator_1.param('userID').isNumeric(), this.authSerivce.validateRequest, this.controller.readUser);
        this.router.post('/', this.authSerivce.isAuthorized(), this.authSerivce.hasPermission(this.name, 'create'), express_validator_1.body('email').isEmail(), express_validator_1.body('firstname').isString(), express_validator_1.body('lastname').isString(), express_validator_1.body('password').isString(), express_validator_1.body('active').isBoolean(), this.authSerivce.validateRequest, this.controller.createUser);
        this.router.put('/:userID', this.authSerivce.isAuthorized(), this.authSerivce.hasPermission(this.name, 'update'), express_validator_1.param('userID').isNumeric(), express_validator_1.body('email').isEmail(), express_validator_1.body('firstname').isString(), express_validator_1.body('lastname').isString(), express_validator_1.body('password').isString(), express_validator_1.body('active').isBoolean(), this.authSerivce.validateRequest, this.controller.updateUser);
        this.router.delete('/:userID', this.authSerivce.isAuthorized(), this.authSerivce.hasPermission(this.name, 'delete'), express_validator_1.param('userID').isNumeric(), this.authSerivce.validateRequest, this.controller.deleteUser);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=routes.js.map