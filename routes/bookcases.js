const express = require('express');
const asyncHandler = require('../middleware/async');
const Bookcase = require('../models/Bookcase');
const Swap = require('../models/Swap');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const bookcases = await Bookcase.find()
            .populate({
                path: 'parentBook',
                select: '-title -_id',
                populate: [
                    {
                        path: 'author',
                        select: 'name -_id',
                    },
                    {
                        path: 'category',
                        select: 'name -_id',
                    },
                    {
                        path: 'publisher',
                        select: 'name -_id',
                    },
                ],
            })
            .populate({
                path: 'owner',
                select: 'name email -_id',
            })
            .populate({
                path: 'swaps',
            });

        res.status(200).json({
            success: true,
            data: bookcases,
        });
    })
);

router.get(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const bookcase = await Bookcase.findById(req.params.id)
                .populate({
                    path: 'parentBook',
                    select: '-title -_id',
                    populate: [
                        {
                            path: 'author',
                            select: 'name -_id',
                        },
                        {
                            path: 'category',
                            select: 'name -_id',
                        },
                        {
                            path: 'publisher',
                            select: 'name -_id',
                        },
                    ],
                })
                .populate({
                    path: 'owner',
                    select: 'name email -_id',
                })
                .populate({
                    path: 'swaps',
                });

            res.status(200).json({
                success: true,
                data: bookcase,
            });
        } catch {
            res.status(404).send('The book with the given id was not found.');
        }
    })
);

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { error } = Bookcase.validateBookcase(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const bookcase = await Bookcase.create(req.body);

        res.status(201).json({
            success: true,
            data: bookcase,
        });
    })
);

// @desc    Swap book
// @route   POST /api/bookcases/:id/swaps
// @access  Private (user)
router.post(
    '/:id/swaps',
    protect,
    asyncHandler(async (req, res, next) => {
        // Sign logged in user id to req.body.user
        req.body.user = req.user.id;

        // Check if bookcase that we want to get is available (exists and is for swap)
        const getBook = await Bookcase.findById(req.params.id);
        if (getBook && getBook.change === true) {
            const offerBook = await Bookcase.findById(req.body.bookToOffer);

            // Check if offered book is user's property
            if (offerBook.owner.toString() === req.user.id) {
                req.body.bookToGet = req.params.id;

                const swap = await Swap.create(req.body);

                res.status(201).json({
                    success: true,
                    data: swap,
                });
            } else {
                res.status(403).send('Offered book does not belong to your account.');
            }
        } else {
            res.status(404).send('Book of the given id is not available.');
        }
    })
);

router.put(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const bookcase = await Bookcase.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });

            res.status(200).json({
                success: true,
                data: bookcase,
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
            const result = await Bookcase.deleteOne({
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
