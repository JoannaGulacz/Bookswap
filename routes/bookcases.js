const express = require('express');
const asyncHandler = require('../middleware/async');
const Bookcase = require('../models/Bookcase');
const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const bookcases = await Bookcase.find();

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
                    select: 'title author -_id',
                })
                .populate({
                    path: 'owner',
                    select: 'name email -_id',
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
        const bookcase = await Bookcase.create(req.body);

        res.status(201).json({
            success: true,
            data: bookcase,
        });
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
