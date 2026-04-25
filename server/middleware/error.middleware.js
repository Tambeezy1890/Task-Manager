const errorMiddleWare = (err, req, res, next) => {
  console.error(err.errors);
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);

    return res.status(400).json({
      success: false,
      type: "ValidationError",
      message: "Validation failed",
      errors,
    });
  }

  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue);

    return res.status(400).json({
      success: false,
      type: "DuplicateKeyError",
      message: `${fields.join(", ")} already exists`,
    });
  }

  return res.status(500).json({
    success: false,
    type: "ServerError",
    message: err.message || "Internal server error",
  });
};

export default errorMiddleWare;
