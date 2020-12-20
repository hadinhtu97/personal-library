
const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = 'http://localhost:3000';

chai.use(chaiHttp);

describe('Functional Tests', function () {

    describe('Routing tests', function () {

        describe('POST /api/books with title => create book object/expect book object', function () {

            it('Test POST /api/books with title', function (done) {
                chai.request(server)
                    .post('/api/books')
                    .send({
                        title: 'Clean Code'
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.title, 'Clean Code');
                        assert.equal(res.body.commentcount, 0);
                        done();
                    })
            });

            it('Test POST /api/books with no title given', function (done) {
                chai.request(server)
                    .post('/api/books')
                    .send({})
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.text, 'missing required field title');
                        done();
                    })
            });

        });


        describe('GET /api/books => array of books', function () {

            it('Test GET /api/books', function (done) {
                chai.request(server)
                    .get('/api/books')
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.isArray(res.body);
                        done();
                    })
            });

        });


        describe('GET /api/books/[id] => book object with [id]', function () {

            it('Test GET /api/books/[id] with id not in db', function (done) {
                chai.request(server)
                    .get('/api/books/1')
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.text, 'no book exists');
                        done();
                    })
            });

            it('Test GET /api/books/[id] with valid id in db', function (done) {

                chai.request(server)
                    .post('/api/books')
                    .send({
                        title: 'test'
                    })
                    .then(data => {
                        id = data.body._id;
                        chai.request(server)
                            .get('/api/books/' + id)
                            .end((err, res) => {
                                assert.equal(res.status, 200);
                                assert.equal(res.body._id, id);
                                done();
                            })
                    })
                    .catch(err => done(err));
            });

        });


        describe('POST /api/books/[id] => add comment/expect book object with id', function () {

            it('Test POST /api/books/[id] with comment', function (done) {
                chai.request(server)
                    .post('/api/books')
                    .send({
                        title: 'test'
                    })
                    .then(data => {
                        id = data.body._id;
                        chai.request(server)
                            .post('/api/books/' + id)
                            .send({
                                comment: 'test comment'
                            })
                            .end((err, res) => {
                                assert.equal(res.status, 200);
                                assert.equal(res.body._id, id);
                                assert.equal(res.body.commentcount, 1);
                                assert.equal(res.body.comments[0], 'test comment');
                                done();
                            })
                    }).catch(err => done(err));

            });

            it('Test POST /api/books/[id] without comment field', function (done) {
                chai.request(server)
                    .post('/api/books')
                    .send({
                        title: 'test'
                    })
                    .then(data => {
                        id = data.body._id;
                        chai.request(server)
                            .post('/api/books/' + id)
                            .send({})
                            .end((err, res) => {
                                assert.equal(res.status, 200);
                                assert.equal(res.text, 'missing required field comment');
                                done();
                            })
                    }).catch(err => done(err));
            });

            it('Test POST /api/books/[id] with comment, id not in db', function (done) {
                chai.request(server)
                    .post('/api/books/1')
                    .send({
                        comment: 'test'
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.text, 'no book exists');
                        done();
                    })
            });

        });

        describe('DELETE /api/books/[id] => delete book object id', function () {

            it('Test DELETE /api/books/[id] with valid id in db', function (done) {
                chai.request(server)
                    .post('/api/books')
                    .send({
                        title: 'test'
                    })
                    .then(data => {
                        id = data.body._id;
                        chai.request(server)
                            .delete('/api/books/' + id)
                            .end((err, res) => {
                                assert.equal(res.status, 200);
                                assert.equal(res.text, 'delete successful');
                                done();
                            })
                    }).catch(err => done(err));
            });

            it('Test DELETE /api/books/[id] with  id not in db', function (done) {
                chai.request(server)
                    .delete('/api/books/1')
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.text, 'no book exists');
                        done();
                    })
            });

        });

    });

});
