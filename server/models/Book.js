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
        _rating: {
            type: Number,
            default: 0,
        },
        _numberOfRates: {
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
        publisherName: Joi.string()
            .min(3)
            .max(250)
            .required(),
        category: Joi.string()
            .min(3)
            .max(250)
            .required(),
        // category: Joi.array().items(
        //     Joi.string()
        //         .min(3)
        //         .max(250)
        //         .required()
        // ),
    });

    return schema.validate(bookData);
}

function getAverageRating(arrayOfReviewObjects) {
    let sumOfRatings = 0;
    for (let i = 0; i < arrayOfReviewObjects.length; i++) {
        sumOfRatings += arrayOfReviewObjects[i].rating;
    }
    return sumOfRatings / arrayOfReviewObjects.length;
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

bookSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'book',
    justOne: false,
});

module.exports = mongoose.model('Book', bookSchema);
module.exports.validateBook = validateBook;
module.exports.getAverageRating = getAverageRating;
