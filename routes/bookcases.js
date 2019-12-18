const express = require('express');
const asyncHandler = require('../middleware/async');
const Bookcase = require('../models/Bookcase');
const Book = require('../models/Book');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.get(
    '/',
    protect,
    authorize('admin'),
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
            });

        res.status(200).json({
            success: true,
            data: bookcases,
        });
    })
);

router.get(
    '/me',
    protect,
    asyncHandler(async (req, res, next) => {
        try {
            // const bookcase = await Bookcase.findById(req.params.id)
            const bookcase = await Bookcase.find(
                {
                    owner: req.user.id,
                },
                {
                    change: 1,
                    title: 1,
                }
            ).populate({
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
            });
            // .populate({
            //     path: 'owner',
            //     select: '-name -email -_id',
            // });

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
    protect,
    asyncHandler(async (req, res, next) => {
        let bookcase;
        console.log('post bookcase...');
        const { error } = Bookcase.validateBookcase(req.body);

        if (error) {
            return res.status(400).send(error);
        }

        let parentBook = await Book.findOne({
            title: req.body.title,
        });

        if (!parentBook) {
            console.log('Create parent book first....');
            parentBook = await Book.create({
                title: req.body.title,
                author: req.body.author,
                publisher: req.body.publisher,
                category: req.body.category,
            });
        }
        console.log('Create bookcase....');
        bookcase = await Bookcase.create({
            owner: req.user.id,
            change: req.body.change,
            title: req.body.title,
            parentBook: parentBook,
        });

        res.status(201).json({
            success: true,
            data: bookcase,
        });
    })
);

router.put(
    '/:id',
    protect,
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
    protect,
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
