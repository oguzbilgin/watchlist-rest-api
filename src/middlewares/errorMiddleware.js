const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // DEVELOPMENT
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }

  // PRODUCTION
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Unknown errors
  console.error("UNEXPECTED ERROR", err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export default errorMiddleware;
