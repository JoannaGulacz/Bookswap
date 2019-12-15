const User = require('../models/User');
//const validate = require('../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/async');

router.post('/', async (req, res) => {
    const { error } = User.validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
});

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const users = await User.find()
            .populate({
                path: 'reviews',
                select: 'title content rating -_id',
                populate: {
                    path: 'book',
                    select: 'title author -_id',
                    populate: {
                        path: 'author',
                        select: 'name -_id',
                    },
                },
            })
            .populate({
                path: 'bookcases',
                select: 'title change -_id',
                populate: {
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
                },
            });

        res.status(200).json({
            success: true,
            data: users,
        });
    })
);

router.get(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id).populate({
                path: 'review',
                select: 'title content rating -_id',
            });

            res.status(200).json({
                success: true,
                data: user,
            });
        } catch {
            res.status(404).send('The user with the given id was not found.');
        }
    })
);

router.put(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });

            res.status(200).json({
                success: true,
                data: user,
            });
        } catch {
            res.status(404).send('The user with the given id was not found.');
        }
    })
);

router.delete(
    '/:id',
    asyncHandler(async (req, res, next) => {
        try {
            const user = await User.findByIdAndRemove(req.params.id);

            res.status(200).json({
                success: true,
                data: user,
            });
        } catch {
            res.status(404).send('Not found');
        }
    })
);

/*
// W router.get('/:id' ...) trzeba dodać:

.populate({
    path: 'bookcases',
    select: 'title change -_id',
})

*/
module.exports = router;
