'use strict';

const LibraryController = require('../controllers/libraryController.js');

module.exports = (app) => {

    const libraryController = new LibraryController();

    app.route('/api/lorem').get((req, res) => {
        // res.send();
    })
}