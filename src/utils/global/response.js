exports.response = (res, statusCode, data) => {
  let success = true;
  if (statusCode >= 400) {
    success = false;
  }

  return res.status(statusCode).json({
    success,
    data,
  });
};

exports.responseOK = (res, data) =>
  res.status(200).json({
    success: true,
    data,
  });

exports.responseCreated = (res, data) =>
  res.status(201).json({
    success: true,
    data,
  });

exports.responseBadRequest = (res, data) =>
  res.status(400).json({
    success: false,
    data,
  });
