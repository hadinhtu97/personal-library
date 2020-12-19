'use strict';

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const bookSchema = new mongoose.Schema({
    title: String,
    commentcount: Number,
    comments: [String]
})

function LibraryController() {

    let BookModel = mongoose.model('books', bookSchema);

    this.getAllBooks = (callback) => {
        BookModel.find({}, (err, data) => err ? callback(err, null) : callback(null, data));
    }

    this.createBook = (title, callback) => {
        let book = new BookModel({
            title: title,
            commentcount: 0,
            comments: []
        });
        book.save((err, data) => err ? callback(err, null) : callback(null, data));
    }

    this.createComment = (_id, comment, callback) => {
        BookModel.findByIdAndUpdate(_id,
            {
                $push: { comments: comment },
                $inc: { commentcount: 1 }
            },
            { new: true },
            (err, data) => err ? callback(err, null) : data == null ? callback(true, null) : callback(null, data)
        );
    }

    this.getBook = (_id, callback) => {
        BookModel.findById(_id, (err, data) => err ? callback(err, null) : data == null ? callback(true, null) : callback(null, data));
    }

    this.deleteBook = (_id, callback) => {
        BookModel.findByIdAndDelete(_id, (err, data) => err ? callback(err, null) : data == null ? callback(true, null) : callback(null, data));
    }

    this.deleteAllBooks = (callback) => {
        BookModel.deleteMany({}, (err, data) => err ? callback(err, null) : callback(null, data));
    }

}

module.exports = LibraryController;