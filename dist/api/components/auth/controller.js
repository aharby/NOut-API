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
exports.AuthController = void 0;
const decko_1 = require("decko");
const auth_1 = require("../../../services/auth");
const utility_1 = require("../../../services/utility");
const model_1 = require("../user/model");
const model_2 = require("../address/model");
const repository_1 = require("../user/repository");
const repository_2 = require("../address/repository");
class AuthController {
    constructor() {
        this.authService = new auth_1.AuthService();
        this.userRepo = new repository_1.UserRepository();
        this.addressRepo = new repository_2.AddressRepository();
    }
    /**
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns HTTP response
     */
    signinUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userRepo.read({
                    select: ['id', 'email', 'firstname', 'lastname', 'password', 'active'],
                    where: {
                        email,
                        active: true
                    }
                });
                if (!user || !(yield utility_1.UtilityService.verifyPassword(password, user.password))) {
                    return res.status(401).json({ status: 401, error: 'Wrong email or password' });
                }
                // Create jwt -> required for further requests
                const token = this.authService.createToken(user.id);
                // Don't send user password in response
                delete user.password;
                return res.json({ token, user });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Register new user
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns HTTP response
     */
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, firstname, lastname, password, co, street, hauseNr, zip, city, country } = req.body;
                const user = yield this.userRepo.read({
                    where: {
                        email
                    }
                });
                if (user) {
                    return res.status(400).json({ error: 'Email is already taken' });
                }
                const newUser = new model_1.User(email, firstname, lastname, yield utility_1.UtilityService.hashPassword(password), true);
                const newAddress = new model_2.Address(co, street, hauseNr, zip, city, country);
                yield this.addressRepo.save(newAddress);
                newUser.address = newAddress;
                const savedUser = yield this.userRepo.save(newUser);
                return res.status(200).json(savedUser);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Unregister user
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns HTTP response
     */
    unregisterUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.user;
                const user = yield this.userRepo.read({
                    where: {
                        email
                    }
                });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                yield this.userRepo.delete(user);
                return res.status(204).send();
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
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinUser", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "unregisterUser", null);
exports.AuthController = AuthController;
//# sourceMappingURL=controller.js.map