const testRouter = require('../routes/tests');
const authorsRouter = require('../routes/authors');
const publishersRouter = require('../routes/publishers');

module.exports = app => {
    app.use('/api/tests', testRouter);
    app.use('/api/authors', authorsRouter);
    app.use('/api/publishers', publishersRouter);
};
