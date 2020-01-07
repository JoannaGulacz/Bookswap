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
        // owner: Joi.string()
        //     .min(3)
        //     .max(250)
        //     .required(),
        change: Joi.boolean(),
        title: Joi.string()
            .min(3)
            .max(250),
        // .required(),
        author: Joi.string()
            .min(3)
            .max(250),
        // .required(),
        publisher: Joi.string()
            .min(3)
            .max(250),
        // .required(),
        category: Joi.string()
            .min(3)
            .max(250),
        // .required(),
        // parentBook: Joi.string()
        //     .min(3)
        //     .max(250)
        //     .required(),
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
