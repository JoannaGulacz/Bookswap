const express = require('express');
const asyncHandler = require('../middleware/async');
const Author = require('../models/Author');
const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const authors = await Author.find();

        res.status(200).json({
            success: true,
            data: authors,
        });
    })
);
