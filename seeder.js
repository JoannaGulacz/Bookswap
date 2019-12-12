const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({
    path: './config/config.env',
});

// Load models
const Test = require('./models/Test');
const Publisher = require('./models/Publisher');
const Book = require('./models/Book');
const Bookcase = require('./models/Bookcase');
const { Author } = require('./models/Author');
const Category = require('./models/Category');
const Review = require('./models/Review');
const User = require('./models/User');

// Connect to DB
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

// Read JSON files
const tests = JSON.parse(fs.readFileSync(`${__dirname}/_data/tests.json`, 'utf-8'));
const publishers = JSON.parse(fs.readFileSync(`${__dirname}/_data/publishers.json`, 'utf-8'));
const books = JSON.parse(fs.readFileSync(`${__dirname}/_data/books.json`, 'utf-8'));
const bookcases = JSON.parse(fs.readFileSync(`${__dirname}/_data/bookcases.json`, 'utf-8'));
const authors = JSON.parse(fs.readFileSync(`${__dirname}/_data/authors.json`, 'utf-8'));
const categories = JSON.parse(fs.readFileSync(`${__dirname}/_data/categories.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Test.create(tests);
        await Publisher.create(publishers);
        await Book.create(books);
        await Bookcase.create(bookcases);
        await Author.create(authors);
        await Category.create(categories);
        await Review.create(reviews);
        await User.create(users);
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Test.deleteMany();
        await Publisher.deleteMany();
        await Book.deleteMany();
        await Bookcase.deleteMany();
        await Author.deleteMany();
        await Category.deleteMany();
        await Review.deleteMany();
        await User.deleteMany();
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
