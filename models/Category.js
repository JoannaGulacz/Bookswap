const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    books: [String],
});

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(45),
        books: Joi.array().items(
            Joi.string()
                .min(1)
                .max(150)
        ),
    });
    return schema.validate(category);
}

// categorySchema.pre('save', function(next) {
//     this.category = this.category.toLowerCase()
//     next();
// });

module.exports = mongoose.model('Category', categorySchema);
module.exports.validateCategory = validateCategory;
