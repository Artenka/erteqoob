var mongoose = require('../../config/mongoose');
var autoIncrement = require('../../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;

var salonpagesSchema = new Schema({
  salonpages_id : {type: Number, unique: true},

  title:  {type: String},
  subtitle:  {type: String},

});

salonpagesSchema.plugin(autoIncrement.plugin, {
  model      : 'Salonpages',
  field      : 'salonpages_id',
  startAt    : 1,
  incrementBy: 1
});

exports.Salonpages = mongoose.model('Salonpages', salonpagesSchema);