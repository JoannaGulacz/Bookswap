const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    books: [String],
});

// publisherSchema.pre('save', function(next) {
//     this.publisher = this.publisher.toLowerCase()
//     next();
// });

module.exports = mongoose.model('Publisher', publisherSchema);
