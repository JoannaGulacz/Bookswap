const express = require('express');
const asyncHandler = require('../middleware/async');
const Author = require('../models/Author');
const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const authors = await Author.find();

        res.status(200).json({
            success: true,
            data: authors,
        });
    })
);

router.get(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const author = await Author.find({ _id: req.params.id });

            res.status(200).json({
                success: true,
                data: author,
            });
        } catch {
            res.status(404).send('The author with the given id was not found.');
        }
    })
);

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const author = await Author.create(req.body);

        res.status(201).json({
            success: true,
            data: author,
        });
    })
);

router.put(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const author = await Author.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        name: req.body.name,
                        born: req.body.born,
                        died: req.body.died,
                        books: req.body.books,
                    },
                },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: author,
            });
        } catch {
            res.status(404).send('The author with the given id was not found.');
        }
    })
);

router.delete(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const result = await Author.deleteOne({ _id: req.params.id });

            res.status(200).json({
                success: true,
                data: result,
            });
        } catch {
            res.status(404).send('The author with the given id was not found.');
        }
    })
);

module.exports = router;
