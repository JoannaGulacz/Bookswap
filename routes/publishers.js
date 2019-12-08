const express = require('express');
const asyncHandler = require('../middleware/async');
const Publisher = require('../models/Publisher');
const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const publishers = await Publisher.find();

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
            const publisher = await Publisher.find({ _id: req.params.id });

            res.status(200).json({
                success: true,
                data: publisher,
            });
        } catch {
            res.status(404).send('Not found');
        }
    })
);

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const publisher = await Publisher.create(req.body);

        res.status(201).json({
            success: true,
            data: publisher,
        });
    })
);

router.put(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const publisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                // {$set: {name: req.body.name}},
                runValidators: true,
            });

            res.status(200).json({
                success: true,
                data: publisher,
            });
        } catch {
            res.status(404).send('Not found');
        }
    })
);

router.delete(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const publisher = await Publisher.findByIdAndRemove(req.params.id);

            res.status(200).json({
                success: true,
                data: publisher,
            });
        } catch {
            res.status(404).send('Not found');
        }
    })
);

module.exports = router;
