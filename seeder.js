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

// Import into DB
const importData = async () => {
    try {
        await Test.create(tests);
        await Publisher.create(publishers);
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
