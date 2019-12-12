const User = require('../models/User');
const validate = require('../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
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

/*
// W router.get('/:id' ...) trzeba dodać:

.populate({
    path: 'bookcases',
    select: 'title change -_id',
})

*/
module.exports = router;
