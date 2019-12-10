const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    books: [String],
});

function validatePublisher(publisher) {
    const schema = Joi.object({
        name: Joi.string()
            .min(1)
            .max(255),
        books: Joi.array().items(
            Joi.string()
                .min(1)
                .max(255)
        ),
    });
    return schema.validate(publisher);
}

// publisherSchema.pre('save', function(next) {
//     this.publisher = this.publisher.toLowerCase()
//     next();
// });

module.exports = mongoose.model('Publisher', publisherSchema);
module.exports.validatePublisher = validatePublisher;
