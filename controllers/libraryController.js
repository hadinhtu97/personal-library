'use strict';

const mongoose = requrie('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


function LibraryController() {

}

module.exports = LibraryController;