const User = require('../models/User');
//const validate = require('../models/User');
const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/async');

const { protect, authorize } = require('../middleware/auth');

router.post('/register', async (req, res) => {
    // Validate req body
    const { error } = User.validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if user already exists
    let user = await User.findOne({
        email: req.body.email,
    });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        const { name, email, password, role } = req.body;

        // Create/Register new user
        user = await User.create({
            name,
            email,
            password,
            role,
        });

        sendTokenResponse(user, 200, res);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).send('Please provide an email and password');
    }

    // Check for user
    const user = await User.findOne({
        email,
    }).select('+password');

    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return res.status(401).send('Invalid credentials');
    }

    sendTokenResponse(user, 200, res);
});

router.get(
    '/me',
    protect,
    asyncHandler(async (req, res, next) => {
        console.log('Zalogowany user: ', req.user);
        const user = await User.findById(req.user.id).populate([
            {
                path: 'reviews',
                select: 'title content rating -_id',
            },
            {
                path: 'bookcases',
                select: 'title change _id',
            },
        ]);

        res.status(200).json({
            success: true,
            data: user,
        });
    })
);

router.get(
    '/',
    protect,
    authorize('admin'),
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
            const user = await User.findById(req.params.id)
                .populate({
                    path: 'review',
                    select: 'title content rating -_id',
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

// @desc    Update password
// @route   PUT /api/v1/users/updatepassword
// @access  Private
router.put(
    '/updatepassword',
    protect,
    asyncHandler(async (req, res, next) => {
        const user = await User.findById(req.user.id).select('+password');

        // Check current password
        if (!(await user.matchPassword(req.body.currentPassword))) {
            return next(new ErrorResponse('Password is incorrect', 401));
        }

        user.password = req.body.newPassword;
        await user.save();

        sendTokenResponse(user, 200, res);
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

// Get token from model, create and send response
const sendTokenResponse = (user, statusCode, res) => {
    console.log('Create token');
    const token = user.getSignedJWT();

    res.status(statusCode).json({
        success: true,
        token,
    });
};

module.exports = router;
