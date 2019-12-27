const express = require('express');
const router = express.Router();

const asyncHandler = require('../middleware/async');
const { protect, authorize } = require('../middleware/auth');

const { Author, validateAuthor } = require('../models/Author');

// @desc    Get all authors
// @route   GET /api/authors
// @access  Public
router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const authors = await Author.find().populate({
            path: 'books',
            select: 'title category -_id',
            populate: {
                path: 'category',
                select: 'name -_id',
            },
        });

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
            validateAuthor(req, res, next);
            const author = await Author.find({ _id: req.params.id }).populate({
                path: 'books',
                select: 'title category -_id',
                populate: {
                    path: 'category',
                    select: 'name -_id',
                },
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

// @desc    Add new author
// @route   POST /api/authors
// @access  Private (user)
router.post(
    '/',
    protect,
    asyncHandler(async (req, res, next) => {
        // Validate request with Joi
        const { error } = validateAuthor(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const author = await Author.create(req.body);

        res.status(201).json({
            success: true,
            data: author,
        });
    })
);

// @desc    Update author info
// @route   PUT /api/authors/:id
// @access  Private (admin)
router.put(
    '/:id',
    protect,
    authorize('admin'), // || 'moderator'
    asyncHandler(async (req, res, next) => {
        try {
            // Validate request with Joi
            const { error } = validateAuthor(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true, // (PUT doesn't validate by default)
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
// @access  Private (admin)
router.delete(
    '/:id',
    protect,
    authorize('admin'),
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