const express = require('express');
const asyncHandler = require('../middleware/async');
const Publisher = require('../models/Publisher');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Book = require('../models/Book');

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const publishers = await Publisher.find().populate({
            path: 'books',
            select: 'title author category _id',
            populate: [
                {
                    path: 'author',
                    select: 'name -_id',
                },
                {
                    path: 'category',
                    select: 'name -_id',
                },
            ],
        });

        res.status(200).json({
            success: true,
            data: publishers,
        });
    })
);
router.get(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const publisher = await Publisher.findById(req.params.id).populate({
                path: 'books',
                select: 'title author category _id',
                populate: [
                    {
                        path: 'author',
                        select: 'name -_id',
                    },
                    {
                        path: 'category',
                        select: 'name -_id',
                    },
                ],
            });

            res.status(200).json({
                success: true,
                data: publisher,
            });
        } catch {
            res.status(404).send('The publisher with the given id was not found.');
        }
    })
);

router.get(
    '/search/:name',
    asyncHandler(async (req, res, next) => {
        try {
            const publisher = await Publisher.find({ name: new RegExp(`.*${req.params.name}.*`, 'i') }).populate({
                path: 'books',
                select: 'title author category _id',
                populate: [
                    {
                        path: 'author',
                        select: 'name -_id',
                    },
                    {
                        path: 'category',
                        select: 'name -_id',
                    },
                ],
            });

            res.status(200).json({
                success: true,
                data: publisher,
            });
        } catch {
            res.status(404).send('The publisher with the given id was not found.');
        }
    })
);

router.post(
    '/',
    protect,
    asyncHandler(async (req, res, next) => {
        const { error } = Publisher.validatePublisher(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const publisher = await Publisher.create(req.body);
        res.status(201).json({
            success: true,
            data: publisher,
        });
    })
);

router.put(
    '/:id',
    protect,
    asyncHandler(async (req, res, next) => {
        try {
            const { error } = Publisher.validatePublisher(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const publisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });

            res.status(200).json({
                success: true,
                data: publisher,
            });
        } catch {
            res.status(404).send('The publisher with the given id was not found.');
        }
    })
);

router.delete(
    '/:id',
    protect,
    asyncHandler(async (req, res, next) => {
        try {
            let book = await Book.findOne({
                publisher: req.params.id,
            });
            if (!book) {
                const publisher = await Publisher.findByIdAndRemove(req.params.id);

                res.status(200).json({
                    success: true,
                    data: publisher,
                });
            } else {
                res.status(404).send('Not found');
            }
        } catch {
            res.status(404).send('Not found');
        }
    })
);

module.exports = router;
