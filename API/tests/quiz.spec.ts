var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Quiz unit tests:', () => {
    it('Should create a Quiz instance', (done: Function) => {
        api.post('/n').send({
            title: 'test',
            hash: 'test'
        }).expect(200, done);
    });
});
