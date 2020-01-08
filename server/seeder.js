const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({
    path: './config/config.env',
});

// Load models
const Publisher = require('./models/Publisher');
const Book = require('./models/Book');
const Bookcase = require('./models/Bookcase');
const Author = require('./models/Author');
const Category = require('./models/Category');
const Review = require('./models/Review');
const User = require('./models/User');
const Swap = require('./models/Swap');

// Connect to DB
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

// Read JSON files
const publishers = JSON.parse(fs.readFileSync(`${__dirname}/_data/publishers.json`, 'utf-8'));
const books = JSON.parse(fs.readFileSync(`${__dirname}/_data/books.json`, 'utf-8'));
const bookcases = JSON.parse(fs.readFileSync(`${__dirname}/_data/bookcases.json`, 'utf-8'));
const authors = JSON.parse(fs.readFileSync(`${__dirname}/_data/authors.json`, 'utf-8'));
const categories = JSON.parse(fs.readFileSync(`${__dirname}/_data/categories.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
const swaps = JSON.parse(fs.readFileSync(`${__dirname}/_data/swaps.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Publisher.create(publishers);
        await Book.create(books);
        await Bookcase.create(bookcases);
        await Author.create(authors);
        await Category.create(categories);
        await Review.create(reviews);
        await User.create(users);
        //await Swap.create(swaps);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Publisher.deleteMany();
        await Book.deleteMany();
        await Bookcase.deleteMany();
        await Author.deleteMany();
        await Category.deleteMany();
        await Review.deleteMany();
        await User.deleteMany();
        await Swap.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
