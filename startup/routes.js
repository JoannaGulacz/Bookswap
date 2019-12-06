//const testRouter = require('../routes/test');
const authorsRouter = require('../routes/authors');

module.exports = app => {
    //app.use('/api/test', testRouter);
    app.use('/api/authors', authorsRouter);
};
