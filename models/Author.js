const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

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

function validate(authorData) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(250)
            .required(),
        born: Joi.date().required(),
        died: Joi.date(),
        books: Joi.array().items(
            Joi.string()
                .min(24)
                .max(24)
        ),
        rating: Joi.number()
            .min(0)
            .max(10),
    });

    return schema.validate(authorData);
}

/*
testSchema.pre('save', function(next) {
    this.test = this.test.toLowerCase()
    next();
});
*/

module.exports.Author = mongoose.model('Author', authorSchema);
module.exports.validateAuthor = validate;
