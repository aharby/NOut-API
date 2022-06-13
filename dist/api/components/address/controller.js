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
exports.AddressController = void 0;
const decko_1 = require("decko");
const model_1 = require("./model");
const repository_1 = require("./repository");
class AddressController {
    constructor() {
        this.repo = new repository_1.AddressRepository();
    }
    /**
     * Read addresses
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns HTTP response
     */
    readAddresses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Addresses = yield this.repo.readAll({}, true);
                return res.json(Addresses);
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
    readAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { addressID } = req.params;
                const address = yield this.repo.read({
                    where: {
                        id: +addressID
                    }
                });
                return res.json(address);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Create address
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns HTTP response
     */
    createAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { co, street, hauseNr, zip, city, country } = req.body;
                const address = new model_1.Address(co, street, hauseNr, zip, city, country);
                const newAddress = yield this.repo.save(address);
                return res.json(newAddress);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    /**
     * Delete address
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns HTTP response
     */
    deleteAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { addressID } = req.params;
                const address = yield this.repo.read({
                    where: {
                        id: +addressID
                    }
                });
                if (!address) {
                    return res.status(404).json({ error: 'Address not found' });
                }
                yield this.repo.delete(address);
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
], AddressController.prototype, "readAddresses", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "readAddress", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "createAddress", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "deleteAddress", null);
exports.AddressController = AddressController;
//# sourceMappingURL=controller.js.map