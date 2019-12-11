const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
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
    //TODO DODAĆ POWIĄZANIE Z AUTORAMI
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
});

const Review = mongoose.model('Review', reviewSchema);

async function createReview(title, content, rating) {
    const review = new Review({
        title,
        content,
        rating,
        // author,
        book,
    });

    const result = await review.save();
    console.log(result);
}

function validateReview(review) {
    const schema = Joi.object({
        title: Joi.string()
            .min(5)
            .max(20)
            .required(),
        content: Joi.string()
            .max(200)
            .required(),
        rating: Joi.number().required(),
    });

    return schema.validate(review);
}

module.exports = mongoose.model('Review', reviewSchema);
