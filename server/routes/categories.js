const express = require('express');
const asyncHandler = require('../middleware/async');
const Category = require('../models/Category');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const category = await Category.find().populate({
            path: 'books',
            select: 'author publisher -_id',
            populate: [
                {
                    path: 'author',
                    select: 'name -_id',
                },
                {
                    path: 'publisher',
                    select: 'name -_id',
                },
            ],
        });

        res.status(200).json({
            success: true,
            data: category,
        });
    })
);

router.get(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const category = await Category.findById(req.params.id).populate({
                path: 'books',
                select: 'author publisher -_id',
                populate: [
                    {
                        path: 'author',
                        select: 'name -_id',
                    },
                    {
                        path: 'publisher',
                        select: 'name -_id',
                    },
                ],
            });

            res.status(200).json({
                success: true,
                data: category,
            });
        } catch {
            res.status(404).send('Category with the given ID not found.');
        }
    })
);

router.post(
    '/',
    protect,
    asyncHandler(async (req, res, next) => {
        const { error } = Category.validateCategory(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const category = await Category.create(req.body);

        res.status(201).json({
            success: true,
            data: category,
        });
    })
);

router.put(
    '/:id',
    protect,
    authorize('admin'),
    asyncHandler(async (req, res, next) => {
        try {
            const { error } = Category.validateCategory(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });

            res.status(200).json({
                success: true,
                data: category,
            });
        } catch {
            res.status(404).send('Category with the given ID not found.');
        }
    })
);

router.delete(
    '/:id',
    protect,
    authorize('admin'),
    asyncHandler(async (req, res, next) => {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);

            res.status(200).json({
                success: true,
                data: category,
            });
        } catch {
            res.status(404).send('Category with the given ID not found.');
        }
    })
);

module.exports = router;
