"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRepository = void 0;
const typeorm_1 = require("typeorm");
const helper_1 = require("../helper");
const model_1 = require("./model");
class AddressRepository extends helper_1.AbsRepository {
    constructor() {
        super('address', typeorm_1.getManager().getRepository(model_1.Address));
    }
}
exports.AddressRepository = AddressRepository;
//# sourceMappingURL=repository.js.map