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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const decko_1 = require("decko");
const typeorm_1 = require("typeorm");
const helper_1 = require("../helper");
const model_1 = require("./model");
class UserRepository extends helper_1.AbsRepository {
    constructor() {
        super('user', typeorm_1.getManager().getRepository(model_1.User));
    }
    /**
     * Read user by email from db
     *
     * @param email Email to search for
     * @returns User
     */
    readByEmail(email) {
        try {
            return this.read({
                where: {
                    email
                }
            });
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRepository.prototype, "readByEmail", null);
exports.UserRepository = UserRepository;
//# sourceMappingURL=repository.js.map