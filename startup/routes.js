const testRouter = require('../routes/test');

module.exports = app => {
    app.use('/api/test', testRouter);
};
