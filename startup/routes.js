const testRouter = require('../routes/tests');
const authorsRouter = require('../routes/authors');
const publishersRouter = require('../routes/publishers');
const booksRouter = require('../routes/books');
const bookcasesRouter = require('../routes/bookcases');
const categoriesRouter = require('../routes/categories');

module.exports = app => {
    app.use('/api/tests', testRouter);
    app.use('/api/authors', authorsRouter);
    app.use('/api/publishers', publishersRouter);
    app.use('/api/books', booksRouter);
    app.use('/api/bookcases', bookcasesRouter);
    app.use('/api/categories', categoriesRouter);
};
