const express = require('express');
const router = express.Router();

const asyncHandler = require('../middleware/async');
const Author = require('../models/Author');
const validateAuthor = require('../middleware/validateAuthor');

// @desc    Get all authors
// @route   GET /api/authors
// @access  Public
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

// @desc    Get a single author
// @route   GET /api/authors/:id
// @access  Public
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

// @desc    Add new author
// @route   POST /api/authors
// @access  Private
router.post(
    '/',
    validateAuthor,
    asyncHandler(async (req, res, next) => {
        const author = await Author.create(req.body);

        res.status(201).json({
            success: true,
            data: author,
        });
    })
);

// @desc    Update author info
// @route   PUT /api/authors/:id
// @access  Private
router.put(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true, // run middleware validation (PUT doesn't validate by default)
            });

            res.status(200).json({
                success: true,
                data: author,
            });
        } catch {
            res.status(404).send('The author with the given id was not found.');
        }
    })
);

// @desc    Delete author
// @route   DELETE /api/authors/:id
// @access  Private
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
