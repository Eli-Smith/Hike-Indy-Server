module.exports = (req, res, next) => {
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, PUT, POST, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')

    next();
}