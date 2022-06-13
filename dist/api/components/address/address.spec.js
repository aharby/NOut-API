"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
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
    describe('POST /addresses', () => {
        it('responds with status 400', (done) => {
            factory.app
                .post('/api/v1/addresses')
                .send()
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
        it('responds with new address', (done) => {
            factory.app
                .post('/api/v1/addresses')
                .send({
                co: 'Methany',
                street: 'Friedrich',
                hauseNr: '32',
                zip: '47535',
                city: 'Berlin',
                country: 'Germany'
            })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                try {
                    if (err)
                        throw err;
                    const address = res.body;
                    chai_1.assert.isObject(address, 'address should be an object');
                    chai_1.expect(address.id).eq(testAddress.id, 'id does not match');
                    chai_1.expect(address.co).eq(testAddress.co, 'co does not match');
                    chai_1.expect(address.street).eq(testAddress.street, 'street does not match');
                    chai_1.expect(address.hauseNr).eq(testAddress.hauseNr, 'hauseNr does not match');
                    chai_1.expect(address.zip).eq(testAddress.zip, 'hauseNr does not match');
                    chai_1.expect(address.city).eq(testAddress.city, 'city does not match');
                    chai_1.expect(address.country).eq(testAddress.country, 'country does not match');
                    return done();
                }
                catch (err) {
                    return done(err);
                }
            });
        });
    });
    describe('GET /addresses', () => {
        it('responds with address array', (done) => {
            factory.app
                .get('/api/v1/addresses')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                try {
                    if (err)
                        throw err;
                    const addresses = res.body;
                    chai_1.assert.isArray(addresses, 'addresses shoud be an array');
                    chai_1.expect(addresses[0].id).eq(testAddress.id, 'id does not match');
                    chai_1.expect(addresses[0].co).eq(testAddress.co, 'co does not match');
                    chai_1.expect(addresses[0].street).eq(testAddress.street, 'street does not match');
                    chai_1.expect(addresses[0].hauseNr).eq(testAddress.hauseNr, 'hauseNr does not match');
                    chai_1.expect(addresses[0].zip).eq(testAddress.zip, 'hauseNr does not match');
                    chai_1.expect(addresses[0].city).eq(testAddress.city, 'city does not match');
                    chai_1.expect(addresses[0].country).eq(testAddress.country, 'country does not match');
                    return done();
                }
                catch (err) {
                    return done(err);
                }
            });
        });
        describe('GET /addresses/1', () => {
            it('responds single address', (done) => {
                factory.app
                    .get('/api/v1/addresses/1')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                    try {
                        if (err)
                            throw err;
                        const address = res.body;
                        chai_1.assert.isObject(address, 'address should be an object');
                        chai_1.expect(address.id).eq(testAddress.id, 'id does not match');
                        chai_1.expect(address.co).eq(testAddress.co, 'co does not match');
                        chai_1.expect(address.street).eq(testAddress.street, 'street does not match');
                        chai_1.expect(address.hauseNr).eq(testAddress.hauseNr, 'hauseNr does not match');
                        chai_1.expect(address.zip).eq(testAddress.zip, 'hauseNr does not match');
                        chai_1.expect(address.city).eq(testAddress.city, 'city does not match');
                        chai_1.expect(address.country).eq(testAddress.country, 'country does not match');
                        return done();
                    }
                    catch (err) {
                        return done(err);
                    }
                });
            });
        });
        describe('DELETE /addresses/1', () => {
            it('responds with status 204', (done) => {
                factory.app.delete('/api/v1/addresses/1').set('Accept', 'application/json').expect(204, done);
            });
            it('responds with status 404', (done) => {
                factory.app.delete('/api/v1/address/1').set('Accept', 'application/json').expect(404, done);
            });
        });
    });
});
//# sourceMappingURL=address.spec.js.map