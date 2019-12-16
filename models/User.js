const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
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
        role: {
            type: String,
            default: 'user',
            enum: ['user'],
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
        role: 'user',
    });
    return schema.validate(user);
}

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJWT = function() {
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        }
    );
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.virtual('bookcases', {
    ref: 'Bookcase',
    localField: '_id',
    foreignField: 'owner',
    justOne: false,
});
UserSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'author',
    justOne: false,
});

module.exports = mongoose.model('User', UserSchema);
module.exports.validateUser = validateUser;
