var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('QuizCreator unit tests:', () => {
    it('Should create a QuizCreator instance', (done: Function) => {
        api.post('/quiz-creators').send({
            name: 'test'
        }).expect(200, done);
    });
});
