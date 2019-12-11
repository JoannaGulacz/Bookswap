const express = require('express');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const reviews = await Review.find().sort({ title: 1 });

        res.status(200).json({
            success: true,
            data: reviews,
        });
    })
);

router.get(
    '/:id',
    asyncHandler(async (req, res, next) => {
        const review = await Review.findById(req.params.id).populate({
            path: 'author',
            select: 'title',
        });

        if (!review) return res.status(404).send('There is no review with given ID in databse');

        res.status(200).json({
            success: true,
            data: review,
        });
    })
);

router.delete(
    '/:id',
    asyncHandler(async (req, res, next) => {
        const review = await Review.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: review,
        });
    })
);

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { error } = validateReview(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let review = new Review({
            title: req.body.title,
            content: req.body.content,
            raiting: req.body.raiting,
            author: req.body.author,
        });

        review = await review.save();

        res.status(200).json({
            success: true,
            data: review,
        });
    })
);

router.put(
    '/:id',
    asyncHandler(async (req, res, next) => {
        const { error } = validateReview(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let review = await Review.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content,
            raiting: req.body.raiting,
            author: req.body.author,
        });

        if (!review) return res.status(404).send('There is no review with given ID in databse');

        res.status(200).json({
            success: true,
            data: review,
        });
    })
);

module.exports = router;
