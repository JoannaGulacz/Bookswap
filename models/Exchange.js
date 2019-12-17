const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        bookToOffer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        bookToGet: {
            type: mongoose.Schema.Types.ObjectId,
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

module.exports.Exchange = mongoose.model('Exchange', exchangeSchema);
