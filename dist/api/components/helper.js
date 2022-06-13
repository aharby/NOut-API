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
exports.AbsRepository = void 0;
const decko_1 = require("decko");
const redis_1 = require("../../services/redis");
class AbsRepository {
    constructor(name, repo, defaultRelations = []) {
        this.name = name;
        this.repo = repo;
        this.defaultRelations = defaultRelations;
    }
    /**
     * Delete cache entries
     */
    deleteFromCache() {
        redis_1.RedisService.deleteByKey(this.name);
    }
    /**
     * Read all entities from db
     *
     * @param options Find options
     * @param cached Use cache
     * @returns Entity array
     */
    readAll(options = {}, cached) {
        try {
            if (Object.keys(options).length) {
                return this.repo.find(Object.assign({ relations: this.defaultRelations }, options));
            }
            if (cached) {
                return redis_1.RedisService.getAndSetObject(this.name, () => this.readAll({}, false));
            }
            return this.repo.find({
                relations: this.defaultRelations
            });
        }
        catch (err) {
            throw new Error(err);
        }
    }
    /**
     * Read a certain entity from db
     *
     * @param options Find options
     * @returns Entity
     */
    read(options) {
        try {
            return this.repo.findOne(Object.assign({ relations: this.defaultRelations }, options));
        }
        catch (err) {
            throw new Error(err);
        }
    }
    /**
     * Save new or updated entity to db
     *
     * @param entity Entity to save
     * @returns Saved entity
     */
    save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saved = yield this.repo.save(entity, { reload: false });
                this.deleteFromCache();
                return saved;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    /**
     * Delete entity from db
     *
     * @param entity Entity to delete
     * @returns Deleted entity
     */
    delete(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield this.repo.remove(entity);
                this.deleteFromCache();
                return deleted;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AbsRepository.prototype, "deleteFromCache", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", Promise)
], AbsRepository.prototype, "readAll", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AbsRepository.prototype, "read", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AbsRepository.prototype, "save", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AbsRepository.prototype, "delete", null);
exports.AbsRepository = AbsRepository;
//# sourceMappingURL=helper.js.map