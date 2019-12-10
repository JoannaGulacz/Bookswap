const mongoose = require('mongoose');

const bookcaseSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    change: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    parentBook: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: true,
    },
});

/*
testSchema.pre('save', function(next) {
    this.test = this.test.toLowerCase()
    next();
});
*/

module.exports = mongoose.model('Bookcase', bookcaseSchema);
