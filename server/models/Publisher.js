const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const publisherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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

function validatePublisher(publisher) {
    const schema = Joi.object({
        name: Joi.string()
            .min(1)
            .max(255)
            .required(),
    });
    return schema.validate(publisher);
}

// publisherSchema.pre('save', function(next) {
//     this.publisher = this.publisher.toLowerCase()
//     next();
// });

publisherSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'publisher',
    justOne: false,
});

module.exports = mongoose.model('Publisher', publisherSchema);
module.exports.validatePublisher = validatePublisher;
