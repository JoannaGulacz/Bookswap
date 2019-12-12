const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const bookcaseSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    change: {
        type: Boolean,
        required: true,
        deafult: false,
    },
    title: {
        type: String,
        required: true,
    },
    parentBook: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: true,
    },
});

function validateBookcase(bookcaseData) {
    const schema = Joi.object({
        owner: Joi.string()
            .min(3)
            .max(250)
            .required(),
        change: Joi.boolean(),
        title: Joi.string()
            .min(3)
            .max(250)
            .required(),
        parentBook: Joi.number()
            .min(24)
            .max(24),
    });

    return schema.validate(bookcaseData);
}

/*
testSchema.pre('save', function(next) {
    this.test = this.test.toLowerCase()
    next();
});
*/

module.exports = mongoose.model('Bookcase', bookcaseSchema);
module.exports.validateBookcase = validateBookcase;
