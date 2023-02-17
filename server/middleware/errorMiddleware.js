function errorLogger(err, req, res, next) {
  console.log( `error: ${err.message}`);
  next(err);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.header("Content-Type", "application/json");

  const status = res.statusCode || 500;
  res
    .status(status)
    .json({ error: err.name, message: err.message, status: status });
}

// eslint-disable-next-line no-unused-vars
function notFoundHandler(req, res, next) {
  res
    .status(404)
    .json({
      error: "Not Found",
      message: `Could not ${req.method} ${req.originalUrl}`,
      status: res.statusCode,
    });
}

module.exports = {
  errorHandler,
  errorLogger,
  notFoundHandler,
};
