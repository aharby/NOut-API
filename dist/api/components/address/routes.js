"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../../services/auth");
const controller_1 = require("./controller");
class AddressRoutes {
    constructor(defaultStrategy) {
        this.name = 'address';
        this.controller = new controller_1.AddressController();
        this.router = express_1.Router();
        this.authSerivce = new auth_1.AuthService(defaultStrategy);
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', 
        //	this.authSerivce.isAuthorized(),
        //	this.authSerivce.hasPermission(this.name, 'read'),
        this.controller.readAddresses);
        this.router.get('/:addressID', 
        //this.authSerivce.isAuthorized(),
        //this.authSerivce.hasPermission(this.name, 'read'),
        express_validator_1.param('addressID').isString(), this.authSerivce.validateRequest, this.controller.readAddress);
        this.router.post('/', 
        //this.authSerivce.isAuthorized(),
        //this.authSerivce.hasPermission(this.name, 'create'),
        //body('name').isString(),
        this.authSerivce.validateRequest, this.controller.createAddress);
        this.router.delete('/:AddressID', 
        //this.authSerivce.isAuthorized(),
        //this.authSerivce.hasPermission(this.name, 'delete'),
        express_validator_1.param('AddressID').isString(), this.authSerivce.validateRequest);
    }
}
exports.AddressRoutes = AddressRoutes;
//# sourceMappingURL=routes.js.map