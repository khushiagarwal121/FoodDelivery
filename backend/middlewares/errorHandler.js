const errorHandler = (err, req, res, next) => {
  // Log the error stack for debugging (could also log to a file or monitoring service)
  console.error(err.stack);

  // Set a default status code if not set
  const statusCode = err.status || 500;

  // Create a response object
  const response = {
    message: err.message || "Internal Server Error", // Default message
    status: statusCode,
  };

  // Optionally include additional error details for development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack; // Include stack trace for development
  }

  // Send the response
  res.status(statusCode).json(response);
};

module.exports = errorHandler;
