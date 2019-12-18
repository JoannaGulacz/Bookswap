const express = require('express');
const path = require('path');
const cors = require('cors');

module.exports = app => {
    app.use(express.json());

    // This will play a role later
    app.use(cors({ origin: 'http://localhost:3000' }));

    app.use(express.static(path.join(`${__dirname}/public`)));
};
