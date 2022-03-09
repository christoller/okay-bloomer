const errorHandler = (err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message || 'Something went wrong.';
    console.error(err, err.stack);
    res.status(status).json({ message });
};

module.exports = errorHandler;
