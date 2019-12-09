const mongoose = require('mongoose');

const bookcaseSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
        unique: true,
    },
    change: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
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
