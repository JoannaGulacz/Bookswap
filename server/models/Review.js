const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const reviewSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
});

function validateReview(review) {
    const schema = Joi.object({
        title: Joi.string()
            .min(5)
            .max(255),
        content: Joi.string()
            .max(500)
            .required(),
        rating: Joi.number().required(),
    });

    return schema.validate(review);
}

module.exports = mongoose.model('Review', reviewSchema);
module.exports.validateReview = validateReview;
