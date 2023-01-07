const mongoose = require('mongoose');

const entitySchema = require('./entity/entity.schema');

exports.Entity = mongoose.model('Entity', entitySchema);
