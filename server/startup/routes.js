const authorsRouter = require('../routes/authors');
const publishersRouter = require('../routes/publishers');
const booksRouter = require('../routes/books');
const bookcasesRouter = require('../routes/bookcases');
const usersRouter = require('../routes/users');
const categoriesRouter = require('../routes/categories');
const reviewsRouter = require('../routes/review');

module.exports = app => {
    app.use('/api/authors', authorsRouter);
    app.use('/api/publishers', publishersRouter);
    app.use('/api/books', booksRouter);
    app.use('/api/bookcases', bookcasesRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/categories', categoriesRouter);
    app.use('/api/reviews', reviewsRouter);
};
