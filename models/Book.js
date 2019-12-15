const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'Author',
            required: true,
        },
        publisher: {
            type: mongoose.Schema.ObjectId,
            ref: 'Publisher',
            required: true,
        },
        rating: {
            type: Number,
            default: 1,
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

function validateBook(bookData) {
    const schema = Joi.object({
        title: Joi.string()
            .min(3)
            .max(250)
            .required(),
        author: Joi.string()
            .min(3)
            .max(250)
            .required(),
        publisher: Joi.string()
            .min(3)
            .max(250)
            .required(),
        rating: Joi.number()
            .min(1)
            .max(5),
        numberRates: Joi.number().min(0),
        category: Joi.array().items(
            Joi.string()
                .min(3)
                .max(250)
                .required()
        ),
    });

    return schema.validate(bookData);
}

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

bookSchema.virtual('authors', {
    ref: 'Author',
    localField: '_id',
    foreignField: 'books',
    justOne: false,
});

module.exports = mongoose.model('Book', bookSchema);
module.exports.validateBook = validateBook;
