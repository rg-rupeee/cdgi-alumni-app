const asyncHandler = require('../../middlewares/asyncHandler');
const AppError = require('../../commons/appError');
const APIFeatures = require('../../commons/appError');
const responses = require('../responses');

exports.deleteOne = (Model, entity = 'document') =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No ${entity} found with that ID`, 404));
    }

    return responses.OK(res, null);
  });

exports.updateOne = (Model, entity = 'document') =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No ${entity} found with that ID`, 404));
    }

    const data = {};
    data[entity] = doc;

    return responses.Send(res, 201, data);
  });

exports.createOne = (Model, entity = 'document') =>
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, _next) => {
    const doc = await Model.create(req.body);

    const data = {};
    data[entity] = doc;

    return responses.Created(res, data);
  });

exports.getOne = (Model, popOptions, entity = 'document') =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError(`No ${entity} found with that ID`, 404));
    }

    const data = {};
    data[entity] = doc;

    return responses.OK(res, data);
  });

exports.getAll = (Model, entity = 'document') =>
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, _next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    const data = {
      results: doc.length,
    };
    data[entity] = doc;

    return responses.OK(res, data);
  });

exports.getAllwithQuery = (Model, query, entity = 'document') =>
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, _next) => {
    const features = new APIFeatures(Model.find(query), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    const data = {
      results: doc.length,
    };
    data[entity] = doc;

    return responses.OK(data);
  });
