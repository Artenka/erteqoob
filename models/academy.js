var mongoose = require('../config/mongoose');
var autoIncrement = require('../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;

var academySchema = new Schema({
  academy_id : {type: Number, unique: true},

  kyivGallery:  [],
  kharkivGallery:  [],

});

academySchema.plugin(autoIncrement.plugin, {
  model      : 'Academy',
  field      : 'academy_id',
  startAt    : 1,
  incrementBy: 1
});

exports.Academy = mongoose.model('Academy', academySchema);