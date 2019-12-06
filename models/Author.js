const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    born: {
        type: Date, // "YYYY-mm-dd"
        required: true,
    },
    died: Date,
    books: [String], // refs to books documents
    rating: Number, // avarage users ratings (stars or nums)
});

/*
testSchema.pre('save', function(next) {
    this.test = this.test.toLowerCase()
    next();
});
*/

module.exports = mongoose.model('Author', authorSchema);
