const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
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

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(45)
            .required(),
    });
    return schema.validate(category);
}

// categorySchema.pre('save', function(next) {
//     this.category = this.category.toLowerCase()
//     next();
// });

categorySchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'category',
    justOne: false,
});

module.exports = mongoose.model('Category', categorySchema);
module.exports.validateCategory = validateCategory;
