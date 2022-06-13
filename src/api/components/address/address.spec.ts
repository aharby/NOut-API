import { assert, expect } from 'chai';

import { TestFactory } from '../../../test/factory';

import { Address } from './model';

describe('Testing address component', () => {
	const factory: TestFactory = new TestFactory();
	const testAddress: Address = Address.mockTestAddress();

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
					zip:'47535',
					city: 'Berlin',
					country: 'Germany'
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;

						const address: Address = res.body;

						assert.isObject(address, 'address should be an object');

						expect(address.id).eq(testAddress.id, 'id does not match');
						expect(address.co).eq(testAddress.co, 'co does not match');
						expect(address.street).eq(testAddress.street, 'street does not match');
						expect(address.hauseNr).eq(testAddress.hauseNr, 'hauseNr does not match');
						expect(address.zip).eq(testAddress.zip, 'hauseNr does not match');
						expect(address.city).eq(testAddress.city, 'city does not match');
						expect(address.country).eq(testAddress.country, 'country does not match');

						return done();
					} catch (err) {
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
						if (err) throw err;

						const addresses: Address[] = res.body;

						assert.isArray(addresses, 'addresses shoud be an array');

						expect(addresses[0].id).eq(testAddress.id, 'id does not match');
						expect(addresses[0].co).eq(testAddress.co, 'co does not match');
						expect(addresses[0].street).eq(testAddress.street, 'street does not match');
						expect(addresses[0].hauseNr).eq(testAddress.hauseNr, 'hauseNr does not match');
						expect(addresses[0].zip).eq(testAddress.zip, 'hauseNr does not match');
						expect(addresses[0].city).eq(testAddress.city, 'city does not match');
						expect(addresses[0].country).eq(testAddress.country, 'country does not match');
						return done();
					} catch (err) {
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
							if (err) throw err;

							const address: Address = res.body;

							assert.isObject(address, 'address should be an object');

							expect(address.id).eq(testAddress.id, 'id does not match');
							expect(address.co).eq(testAddress.co, 'co does not match');
							expect(address.street).eq(testAddress.street, 'street does not match');
							expect(address.hauseNr).eq(testAddress.hauseNr, 'hauseNr does not match');
							expect(address.zip).eq(testAddress.zip, 'hauseNr does not match');
							expect(address.city).eq(testAddress.city, 'city does not match');
							expect(address.country).eq(testAddress.country, 'country does not match');
	
							return done();
						} catch (err) {
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
