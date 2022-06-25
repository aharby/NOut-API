"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../../../test/factory");
const model_1 = require("./model");
describe('Testing address component', () => {
    const factory = new factory_1.TestFactory();
    const testAddress = model_1.Address.mockTestAddress();
    before((done) => {
        factory.init().then(done);
    });
    after((done) => {
        factory.close().then(done);
    });
});
//# sourceMappingURL=address.spec.js.map