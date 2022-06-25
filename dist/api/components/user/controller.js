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
exports.UserController = void 0;
const decko_1 = require("decko");
const utility_1 = require("../../../services/utility");
const model_1 = require("./model");
const repository_1 = require("./repository");
const repository_2 = require("../interest/repository");
class UserController {
    constructor() {
        this.repo = new repository_1.UserRepository();
        this.interestRepo = new repository_2.InterestRepository();
    }
    /**
     * Read users
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns HTTP response
     */
    readUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.repo.readAll({}, true);
                return res.json(users);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Read user
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns HTTP response
     */
    readUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userID } = req.params;
                const user = yield this.repo.read({
                    where: {
                        id: userID
                    }
                });
                return res.json(user);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Read user by email
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns HTTP response
     */
    readUserByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.query;
                const user = yield this.repo.readByEmail(email);
                return res.json(user);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Create user
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns HTTP response
     */
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, firstname, lastname, password, active } = req.body;
                const existingUser = yield this.repo.read({
                    where: {
                        email
                    }
                });
                if (existingUser) {
                    return res.status(400).json({ error: 'Email is already taken' });
                }
                const user = new model_1.User(email, firstname, lastname, yield utility_1.UtilityService.hashPassword(password), active);
                const newUser = yield this.repo.save(user);
                return res.json(newUser);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Update user
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns HTTP response
     */
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userID } = req.params;
                const { email, firstname, lastname, password, active } = req.body;
                if (!userID) {
                    return res.status(400).json({ error: 'Invalid request' });
                }
                const existingUser = yield this.repo.read({
                    where: {
                        id: userID
                    }
                });
                if (!existingUser) {
                    return res.status(404).json({ error: 'User not found' });
                }
                existingUser.email = email;
                existingUser.firstname = firstname;
                existingUser.lastname = lastname;
                existingUser.password = yield utility_1.UtilityService.hashPassword(password);
                existingUser.active = active;
                const updatedUser = yield this.repo.save(existingUser);
                return res.json(updatedUser);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Delete user
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns HTTP response
     */
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userID } = req.params;
                const user = yield this.repo.read({
                    where: {
                        id: userID
                    }
                });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                yield this.repo.delete(user);
                return res.status(204).send();
            }
            catch (err) {
                return next(err);
            }
        });
    }
    addUserInterest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userID } = req.params;
                const { interestName } = req.body;
                const user = yield this.repo.read({
                    where: {
                        id: userID
                    }
                });
                const interest = yield this.interestRepo.read({
                    where: {
                        name: interestName
                    }
                });
                user.interests = [interest];
                yield this.repo.save(user);
                return res.json(user);
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
], UserController.prototype, "readUsers", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "readUser", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "readUserByEmail", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUserInterest", null);
exports.UserController = UserController;
//# sourceMappingURL=controller.js.map