const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        born: {
            type: String, // "YYYY-mm-dd"
        },
        died: String,
        rating: Number,
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

function validate(authorData) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(250)
            .required(),
        born: Joi.string(),
        died: Joi.string(),
        rating: Joi.number()
            .min(0)
            .max(10),
    });

    return schema.validate(authorData);
}

authorSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author',
    justOne: false,
});

module.exports = mongoose.model('Author', authorSchema);
module.exports.validateAuthor = validate;
