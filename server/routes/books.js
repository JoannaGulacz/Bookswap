const express = require('express');
const asyncHandler = require('../middleware/async');
const Book = require('../models/Book');
const router = express.Router();
const Category = require('../models/Category');
const Publisher = require('../models/Publisher');
const Review = require('../models/Review');
const Author = require('../models/Author');
const { protect, authorize } = require('../middleware/auth');

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const books = await Book.find()
            .populate({
                path: 'bookcases',
                select: 'owner change -_id',
            })
            .populate({
                path: 'category',
                select: 'name -_id',
            })
            .populate({
                path: 'publisher',
                select: 'name -_id',
            })
            .populate({
                path: 'author',
                select: 'name -_id',
            })
            .populate({
                path: 'reviews',
                select: 'rating title -_id',
            });

        for (let i = 0; i < books.length; i++) {
            const rates = await Review.find({ book: books[i].id });
            books[i]._rating = await Book.getAverageRating(rates);
            books[i]._numberOfRates = rates.length;
        }

        res.status(200).json({
            success: true,
            data: books,
        });
    })
);

router.get(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const book = await Book.findById(req.params.id)
                .populate({
                    path: 'bookcases',
                    select: 'owner change -_id',
                })
                .populate({
                    path: 'category',
                    select: 'name -_id',
                })
                .populate({
                    path: 'publisher',
                    select: 'name -_id',
                })
                .populate({
                    path: 'author',
                    select: 'name -_id',
                })
                .populate({
                    path: 'reviews',
                    select: 'rating title -_id',
                });

            const rates = await Review.find({ book: book.id });
            book._rating = await Book.getAverageRating(rates);
            book._numberOfRates = rates.length;

            res.status(200).json({
                success: true,
                data: book,
            });
        } catch {
            res.status(404).send('The book with the given id was not found.');
        }
    })
);

router.post(
    '/',
    protect,
    authorize('admin'),
    asyncHandler(async (req, res, next) => {
        const { error } = Book.validateBook(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let category = await Category.find({
            name: req.body.category,
        });

        if (!category.length) {
            category = await Category.create({
                name: req.body.category,
            });
        } else {
            category = category[0];
        }
        category=category._id

        let author = await Author.find({
            name: req.body.author,
        });

        if (!author.length) {
            author = await Author.create({
                name: req.body.author,
            });
        } else {
            author = author[0];
        }
        author = author._id;

        let publisher = await Publisher.findOne({
            name: req.body.publisher,
        });

        if (!publisher) {
            publisher = await Publisher.create({
                name: req.body.publisher,
            });
        }
        publisher = publisher._id

        const book = await Book.create({
            title: req.body.title,
            author: author,
            publisher: publisher,
            category: category,
        });

        res.status(201).json({
            success: true,
            data: book,
        });
    })
);

router.put(
    '/:id',
    protect,
    authorize('admin'),
    asyncHandler(async (req, res, next) => {
        try {
            const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });

            res.status(200).json({
                success: true,
                data: book,
            });
        } catch {
            res.status(404).send('The book with the given id was not found.');
        }
    })
);

router.delete(
    '/:id',
    protect,
    authorize('admin'),
    asyncHandler(async (req, res, next) => {
        try {
            await Book.deleteOne({
                _id: req.params.id,
            });

            res.status(200).json({
                success: true,
                // data: result,
            });
        } catch {
            res.status(404).send('The book with the given id was not found.');
        }
    })
);

module.exports = router;
