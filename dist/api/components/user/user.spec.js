"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const factory_1 = require("../../../test/factory");
const model_1 = require("./model");
describe('Testing user component', () => {
    const factory = new factory_1.TestFactory();
    const testUser = model_1.User.mockTestUser();
    const testUserUpdated = Object.assign(Object.assign({}, testUser), { firstname: 'testFirstnameModified', lastname: 'testLastnameModified' });
    before((done) => {
        factory.init().then(done);
    });
    after((done) => {
        factory.close().then(done);
    });
    describe('POST /users', () => {
        it('responds with status 400', (done) => {
            factory.app
                .post('/api/v1/users')
                .send()
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
        it('responds with new user', (done) => {
            factory.app
                .post('/api/v1/users')
                .send({
                email: testUser.email,
                firstname: testUser.firstname,
                lastname: testUser.lastname,
                password: testUser.password,
                active: testUser.active
            })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                try {
                    if (err)
                        throw err;
                    const user = res.body;
                    chai_1.assert.isObject(user, 'user should be an object');
                    chai_1.expect(user.id).eq(testUser.id, 'id does not match');
                    chai_1.expect(user.email).eq(testUser.email, 'email does not match');
                    chai_1.expect(user.firstname).eq(testUser.firstname, 'firstname does not match');
                    chai_1.expect(user.lastname).eq(testUser.lastname, 'lastname does not match');
                    chai_1.expect(user.active).eq(testUser.active, 'active does not match');
                    return done();
                }
                catch (err) {
                    return done(err);
                }
            });
        });
    });
    describe('PUT /users/1', () => {
        it('responds with updated user', (done) => {
            factory.app
                .put('/api/v1/users/1')
                .send({
                email: testUserUpdated.email,
                firstname: testUserUpdated.firstname,
                lastname: testUserUpdated.lastname,
                password: testUserUpdated.password,
                active: testUserUpdated.active
            })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                try {
                    if (err)
                        throw err;
                    const user = res.body;
                    chai_1.assert.isObject(user, 'user should be an object');
                    chai_1.expect(user.id).eq(testUserUpdated.id, 'id does not match');
                    chai_1.expect(user.email).eq(testUserUpdated.email, 'email does not match');
                    chai_1.expect(user.firstname).eq(testUserUpdated.firstname, 'firstname does not match');
                    chai_1.expect(user.lastname).eq(testUserUpdated.lastname, 'lastname does not match');
                    chai_1.expect(user.active).eq(testUserUpdated.active, 'active does not match');
                    return done();
                }
                catch (err) {
                    return done(err);
                }
            });
        });
    });
    describe('GET /users', () => {
        it('responds with user array', (done) => {
            factory.app
                .get('/api/v1/users')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                try {
                    if (err)
                        throw err;
                    const users = res.body;
                    chai_1.assert.isArray(users, 'users should be an array');
                    chai_1.expect(users[0].id).eq(testUserUpdated.id, 'id does not match');
                    chai_1.expect(users[0].email).eq(testUserUpdated.email, 'email does not match');
                    chai_1.expect(users[0].firstname).eq(testUserUpdated.firstname, 'firstname does not match');
                    chai_1.expect(users[0].lastname).eq(testUserUpdated.lastname, 'lastname does not match');
                    chai_1.expect(users[0].active).eq(testUserUpdated.active, 'active does not match');
                    return done();
                }
                catch (err) {
                    return done(err);
                }
            });
        });
    });
    describe('GET /users/1', () => {
        it('responds with single user', (done) => {
            factory.app
                .get('/api/v1/users/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                try {
                    if (err)
                        throw err;
                    const user = res.body;
                    chai_1.assert.isObject(user, 'user should be an object');
                    chai_1.expect(user.id).eq(testUserUpdated.id, 'id does not match');
                    chai_1.expect(user.email).eq(testUserUpdated.email, 'email does not match');
                    chai_1.expect(user.firstname).eq(testUserUpdated.firstname, 'firstname does not match');
                    chai_1.expect(user.lastname).eq(testUserUpdated.lastname, 'lastname does not match');
                    chai_1.expect(user.active).eq(testUserUpdated.active, 'active does not match');
                    return done();
                }
                catch (err) {
                    return done(err);
                }
            });
        });
    });
    describe('GET /users/search', () => {
        it('responds with single user', (done) => {
            factory.app
                .get('/api/v1/users/search')
                .query({ email: testUserUpdated.email })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                try {
                    if (err)
                        throw err;
                    const user = res.body;
                    chai_1.assert.isObject(user, 'user should be an object');
                    chai_1.expect(user.id).eq(testUserUpdated.id, 'id does not match');
                    chai_1.expect(user.email).eq(testUserUpdated.email, 'email does not match');
                    chai_1.expect(user.firstname).eq(testUserUpdated.firstname, 'firstname does not match');
                    chai_1.expect(user.lastname).eq(testUserUpdated.lastname, 'lastname does not match');
                    chai_1.expect(user.active).eq(testUserUpdated.active, 'active does not match');
                    return done();
                }
                catch (err) {
                    return done(err);
                }
            });
        });
    });
    describe('DELETE /users/1', () => {
        it('responds with status 204', (done) => {
            factory.app.delete('/api/v1/users/1').set('Accept', 'application/json').expect(204, done);
        });
        it('responds with status 404', (done) => {
            factory.app.delete('/api/v1/users/1').set('Accept', 'application/json').expect(404, done);
        });
    });
});
//# sourceMappingURL=user.spec.js.map