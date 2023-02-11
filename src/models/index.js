const mongoose = require('mongoose');

const entitySchema = require('./entity/entity.schema');
const profileSchema = require('./profile/profile.schema');

exports.Entity = mongoose.model('Entity', entitySchema);
exports.Profile = mongoose.model('Profile', profileSchema);
