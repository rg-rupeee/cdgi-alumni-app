exports.response = (res, statusCode, data) => {
  let status = 'success';
  if (statusCode >= 300) {
    status = 'fail';
  }

  return res.status(statusCode).json({
    status,
    data,
  });
};

exports.responseOK = (res, data) => {
  return res.status(200).json({
    status: 'success',
    data,
  });
};

exports.responseCreated = (res, data) => {
  return res.status(201).json({
    status: 'success',
    data,
  });
};

exports.responseBadRequest = (res, data) => {
  return res.status(400).json({
    status: 'fail',
    data,
  });
};
