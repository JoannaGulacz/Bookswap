const express = require('express');
const asyncHandler = require('../middleware/async');
const Book = require('../models/Book');
const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const books = await Book.find();

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
                });
            //console.log(book);
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
    asyncHandler(async (req, res, next) => {
        const book = await Book.create(req.body);

        res.status(201).json({
            success: true,
            data: book,
        });
    })
);

router.put(
    '/:id',
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
    asyncHandler(async (req, res, next) => {
        try {
            const result = await Book.deleteOne({
                _id: req.params.id,
            });

            res.status(200).json({
                success: true,
                data: result,
            });
        } catch {
            res.status(404).send('The book with the given id was not found.');
        }
    })
);

module.exports = router;
