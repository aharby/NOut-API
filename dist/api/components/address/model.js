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
var Address_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const typeorm_1 = require("typeorm");
const nanoid_1 = require("nanoid");
let Address = Address_1 = class Address {
    constructor(co, street, hauseNr, zip, city, country) {
        this.id = nanoid_1.nanoid();
        this.co = co;
        this.street = street;
        this.hauseNr = hauseNr;
        this.zip = zip;
        this.city = city;
        this.country = country;
    }
    static mockTestAddress() {
        return new Address_1('methany', 'Friedrich str.', '32', '47532', 'Berlin', 'Germany');
    }
};
__decorate([
    typeorm_1.PrimaryColumn("varchar", {
        length: 22
    }),
    __metadata("design:type", String)
], Address.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "co", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "hauseNr", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "zip", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
Address = Address_1 = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, String, String, String, String, String])
], Address);
exports.Address = Address;
//# sourceMappingURL=model.js.map