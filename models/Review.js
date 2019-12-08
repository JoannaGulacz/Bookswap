const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const reviewSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
    },
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
    //TODO poprawnie wcisnać powiązany model użytownika
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Review = mongoose.model('Review', reviewSchema);

async function createReview(title, content, rating, author) {
    const review = new Review({
        title,
        content,
        rating,
        author,
    });

    const result = await review.save();
    console.log(result);
}

function validateReview(review) {
    const schema = {
        title: Joi.string()
            .min(5)
            .max(20)
            .required(),
        content: Joi.string()
            .max(200)
            .required(),
        rating: Joi.number().required(),
    };

    return Joi.vaidate(review, schema);
}
