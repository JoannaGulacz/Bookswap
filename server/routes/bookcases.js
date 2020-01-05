const express = require('express');
const asyncHandler = require('../middleware/async');
const Bookcase = require('../models/Bookcase');
const Book = require('../models/Book');
const Swap = require('../models/Swap');
const router = express.Router();
const Category = require('../models/Category');
const Publisher = require('../models/Publisher');
const Author = require('../models/Author');
const { protect, authorize } = require('../middleware/auth');

router.get(
    '/',
    protect,
    // authorize('admin'),
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
            )
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

router.get(
    '/search/:title',
    asyncHandler(async (req, res, next) => {
        try {
            const bookcase = await Bookcase.find({ title: new RegExp(`.*${req.params.title}.*`, 'i') })
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
            const { error_book } = Book.validateBook(req.body);
            if (error_book) {
                return res.status(400).send('Title, author, publisher and category required');
            }

            let category = await Category.find({
                name: req.body.category,
            });

            if (!category.length) {
                category = await Category.create({
                    name: req.body.category,
                });
            } else {
                category = category[0];
            }
            category = category._id;

            let author = await Author.find({
                name: req.body.author,
            });

            if (!author.length) {
                author = await Author.create({
                    name: req.body.author,
                });
            } else {
                author = author[0];
            }
            author = author._id;

            let publisher = await Publisher.findOne({
                name: req.body.publisher,
            });

            if (!publisher) {
                publisher = await Publisher.create({
                    name: req.body.publisher,
                });
            }
            publisher = publisher._id;

            parentBook = await Book.create({
                title: req.body.title,
                author: author,
                publisher: publisher,
                category: category,
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
router.get(
    '/swaps',
    protect,
    asyncHandler(async (req, res, next) => {
        const bookcases = await Bookcase.find({
            change: true,
        })
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
    '/swaps/:title',
    protect,
    asyncHandler(async (req, res, next) => {
        const bookcases = await Bookcase.find({
            change: true,
            title: new RegExp(`.*${req.params.title}.*`, 'i'),
        })
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
    protect,
    asyncHandler(async (req, res, next) => {
        try {
            const bookcase = await Bookcase.findById(req.params.id);
            console.log(bookcase);
            if (bookcase.owner == req.user.id) {
                bookcase.owner = req.user.id;
                bookcase.change = req.body.change;
                const bookcase_update = await Bookcase.findByIdAndUpdate(req.params.id, bookcase, {
                    new: true,
                    runValidators: true,
                });
                res.status(200).json({
                    success: true,
                    data: bookcase_update,
                });
            } else {
                res.status(401).send("You don't have permission");
            }
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
            const bookcase = await Bookcase.findById(req.params.id);
            console.log(bookcase);
            if (bookcase.owner == req.user.id) {
                const result = await Bookcase.deleteOne({
                    _id: req.params.id,
                });
                res.status(200).json({
                    success: true,
                });
            } else {
                return res.status(401).send("You don't have permission");
            }
        } catch {
            res.status(404).send('The book with the given id was not found.');
        }
    })
);

module.exports = router;
