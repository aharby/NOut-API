import { assert, expect } from 'chai';

import { TestFactory } from '../../../test/factory';

import { Interest } from './model';

describe('Testing interest component', () => {
	const factory: TestFactory = new TestFactory();
	const testInterest: Interest = Interest.mockTestInterest();

	before((done) => {
		factory.init().then(done);
	});

	after((done) => {
		factory.close().then(done);
	});

	describe('POST /interests', () => {
		it('responds with status 400', (done) => {
			factory.app
				.post('/api/v1/interests')
				.send()
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(400, done);
		});

		

	describe('GET /intersts', () => {
		it('responds with interest array', (done) => {
			factory.app
				.get('/api/v1/interests')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;

						const interests: Interest[] = res.body;

						assert.isArray(interests, 'interests shoud be an array');

						expect(interests[0].id).eq(testInterest.id, 'id does not match');
						expect(interests[0].name).eq(testInterest.name, 'name does not match');
						return done();
					} catch (err) {
						return done(err);
					}
				});
			});
		});
	});
});
