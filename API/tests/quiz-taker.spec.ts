var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('QuizTaker unit tests:', () => {
    it('Should create a QuizTaker instance', (done: Function) => {
        api.post('/quiz-takers').send({
            name: 'test'
        }).expect(200, done);
    });
});
