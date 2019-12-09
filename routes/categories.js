const express = require('express');
const asyncHandler = require('../middleware/async');
const Category = require('../models/Category');
const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const category = await Category.find();

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
            const category = await Category.findById(req.params._id);

            res.status(200).json({
                success: true,
                data: category,
            });
        } catch {
            res.status(404).send('Category not found.');
        }
    })
);

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const category = await Category.create(req.body);

        res.status(201).json({
            success: true,
            data: category,
        });
    })
);

router.put(
    '/',
    asyncHandler(async (req, res, next) => {
        const category = await Category.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true });

        res.status(201).json({
            success: true,
            data: category,
        });
    })
);

router.delete(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const category = await Category.findByIdAndDelete(req.params._id);

            res.status(200).json({
                success: true,
                data: category,
            });
        } catch {
            res.status(404).send('Category not found.');
        }
    })
);

module.exports = router;
