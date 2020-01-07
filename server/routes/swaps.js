const express = require('express');
const asyncHandler = require('../middleware/async');
const Swap = require('../models/Swap');
const router = express.Router();
const { protect } = require('../middleware/auth');

// @desc    Get all swaps (sent by logged user)
// @route   GET /api/swaps/sent
// @access  Private (user)
router.get(
    '/sent',
    protect,
    asyncHandler(async (req, res, next) => {
        const swaps = await Swap.find({
            user: req.user.id,
        })
            .populate({
                path: 'userThatGetsOffer',
            })
            .populate({
                path: 'bookToOffer',
                populate: {
                    path: 'parentBook',
                },
            })
            .populate({
                path: 'bookToGet',
                populate: {
                    path: 'parentBook',
                },
            });

        res.status(200).json({
            success: true,
            data: swaps,
        });
    })
);

// @desc    Get all swaps (received by logged user)
// @route   GET /api/swaps/received
// @access  Private (user)
router.get(
    '/received',
    protect,
    asyncHandler(async (req, res, next) => {
        let swaps = await Swap.find({ userThatGetsOffer: req.user.id })
            .populate({
                path: 'userThatGetsOffer',
            })
            .populate({
                path: 'bookToOffer',
                populate: {
                    path: 'parentBook',
                },
            })
            .populate({
                path: 'bookToGet',
                populate: {
                    path: 'parentBook',
                },
            });

        res.status(200).json({
            success: true,
            data: swaps,
        });
    })
);

// @desc    Get all swaps from server
// @route   GET /api/swaps/received
// @access  Private (user)
router.get(
    '/',
    protect,
    asyncHandler(async (req, res, next) => {
        let swaps = await Swap.find();

        res.status(200).json({
            success: true,
            data: swaps,
        });
    })
);

// @desc    Get single swap
// @route   GET /api/swaps
// @access  Private (user)
router.get(
    '/:id',
    protect,
    asyncHandler(async (req, res, next) => {
        const swap = await Swap.findById(req.params.id).populate({
            path: 'user',
            select: 'name',
        });

        res.status(200).json({
            success: true,
            data: swap,
        });
    })
);

// @desc    Delete swap
// @route   Delete /api/swaps/:id
// @access  Private (user)
router.delete(
    '/:id',
    protect,
    asyncHandler(async (req, res, next) => {
        await Swap.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: [],
        });
    })
);

module.exports = router;
