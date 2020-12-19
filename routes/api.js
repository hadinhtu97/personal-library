'use strict';

const LibraryController = require('../controllers/libraryController.js');

module.exports = (app) => {

    const libraryController = new LibraryController();

    app.route('/api/books')
        .get((req, res) => {
            libraryController.getAllBooks((err, books) => err ? res.json(err) : res.json(books));
        })
        .post((req, res) => {
            req.body.title == undefined
                ? res.send('missing required field title')
                : libraryController.createBook(req.body.title, (err, book) => err ? res.json(err) : res.json(book));
        })
        .delete((req, res) => {
            libraryController.deleteAllBooks((err, books) => err ? res.json(err) : res.send('complete delete successful'));
        });
    app.route('/api/books/:id')
        .get((req, res) => {
            libraryController.getBook(req.params.id, (err, book) => err ? res.send('no book exists') : res.json(book));
        })
        .post((req, res) => {
            req.body.comment == undefined
                ? res.send('missing required field comment')
                : libraryController.createComment(req.params.id, req.body.comment, (err, bookUpdated) => err ? res.send('no book exists') : res.json(bookUpdated))
        })
        .delete((req, res) => {
            libraryController.deleteBook(req.params.id, (err, bookDeleted) => err ? res.send('no book exists') : res.send('delete successful'));
        })
}