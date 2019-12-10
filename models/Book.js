const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
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
            type: mongoose.Schema.ObjectId,
            ref: 'Publisher',
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        numberRates: {
            type: Number,
            default: 0,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);
/*
testSchema.pre('save', function(next) {
    this.test = this.test.toLowerCase()
    next();
});
*/
// Reverse populate with virtuals
bookSchema.virtual('bookcases', {
    ref: 'Bookcase',
    localField: '_id',
    foreignField: 'parentBook',
    justOne: false,
});

module.exports = mongoose.model('Book', bookSchema);
