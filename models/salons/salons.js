var mongoose = require('../../config/mongoose');
var autoIncrement = require('../../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;

var salonsSchema = new Schema({
  salons_id : {type: Number, unique: true},

  title:  {type: String},
  subtitle:  {type: String},

});

salonsSchema.plugin(autoIncrement.plugin, {
  model      : 'Salons',
  field      : 'salons_id',
  startAt    : 1,
  incrementBy: 1
});

exports.Salons = mongoose.model('Salons', salonsSchema);