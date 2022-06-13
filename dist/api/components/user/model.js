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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const nanoid_1 = require("nanoid");
const typeorm_1 = require("typeorm");
const model_1 = require("../address/model");
let User = User_1 = class User {
    constructor(email, firstname, lastname, password, active) {
        this.id = nanoid_1.nanoid();
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.active = active;
    }
    static mockTestUser() {
        const user = new User_1('test@email.com', 'testFirstname', 'testLastname', 'testPassword', true);
        user.address = new model_1.Address('methany', 'Friedrich str.', '32', '47532', 'Berlin', 'Germany');
        return user;
    }
};
__decorate([
    typeorm_1.PrimaryColumn("varchar", {
        length: 22
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column({
        select: false
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        default: true
    }),
    __metadata("design:type", Boolean)
], User.prototype, "active", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", typeorm_1.Timestamp)
], User.prototype, "created", void 0);
__decorate([
    typeorm_1.OneToOne(() => model_1.Address),
    typeorm_1.JoinColumn(),
    __metadata("design:type", model_1.Address)
], User.prototype, "address", void 0);
User = User_1 = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, String, String, String, Boolean])
], User);
exports.User = User;
//# sourceMappingURL=model.js.map