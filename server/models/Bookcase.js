const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const bookcaseSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        change: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            required: true,
        },
        parentBook: {
            type: mongoose.Schema.ObjectId,
            ref: 'Book',
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

function validateBookcase(bookcaseData) {
    const schema = Joi.object({
        change: Joi.boolean(),
        title: Joi.string()
            .min(3)
            .max(250),
        author: Joi.string()
            .min(3)
            .max(250),
        publisher: Joi.string()
            .min(3)
            .max(250),
        category: Joi.string()
            .min(3)
            .max(250),
    });

    return schema.validate(bookcaseData);
}

bookcaseSchema.virtual('swaps', {
    ref: 'Swap',
    localField: '_id',
    foreignField: 'bookToGet',
    justOne: false,
});

module.exports = mongoose.model('Bookcase', bookcaseSchema);
module.exports.validateBookcase = validateBookcase;
