'use strict';

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const bookSchema = new mongoose.Schema({
    title: String,
    commentcount: Number,
    comments: [String]
})

const BookModel = mongoose.model('books', bookSchema);

module.exports = BookModel;