const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    books: [String],
});

// categorySchema.pre('save', function(next) {
//     this.category = this.category.toLowerCase()
//     next();
// });

module.exports = mongoose.model('Category', categorySchema);
