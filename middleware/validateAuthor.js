const Joi = require('@hapi/joi');

function validateAuthor(req, res, next) {
    const schema = {
        name: Joi.string()
            .min(3)
            .max(250)
            .required(),
        born: Joi.date().required(),
        died: Joi.date(),
        books: Joi.array().items(
            Joi.string()
                .min(24)
                .max(24)
        ),
        rating: Joi.number()
            .min(0)
            .max(10),
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error);
    } else {
        next();
    }
}

module.exports = validateAuthor;

/*
name: {
        type: String,
        required: true,
        unique: true,
    },
    born: {
        type: Date, // "YYYY-mm-dd"
        required: true,
    },
    died: Date,
    books: [String], // refs to books documents
    rating: Number, // avarage users ratings (stars or nums)
});
 */
