const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        bookToOffer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bookcase',
            required: true,
        },
        bookToGet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bookcase',
            required: true,
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

module.exports = mongoose.model('Swap', swapSchema);
