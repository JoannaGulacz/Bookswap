const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024,
            select: false,
        },
        //JAK ROBIMY VIRTUALA NIE TRZEBA DODAWAĆ POZYCJI W SCHEMIE
        // review: {
        //     type: mongoose.Schema.ObjectId,
        //     ref: 'Review',
        // },
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

function validateUser(user) {
    console.log('Validation started');
    const schema = Joi.object({
        name: Joi.string()
            .min(5)
            .max(50)
            .required(),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required(),
    });
    return schema.validate(user);
}

userSchema.virtual('bookcases', {
    ref: 'Bookcase',
    localField: '_id',
    foreignField: 'owner',
    justOne: false,
});
userSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'author',
    justOne: false,
});

module.exports = mongoose.model('User', userSchema);
module.exports.validateUser = validateUser;
