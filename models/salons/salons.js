var mongoose = require('../../config/mongoose');
var autoIncrement = require('../../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;

var salonsSchema = new Schema({
  salons_id: {type: Number, unique: true},

  name: {type: String},
  path: {type: String},
  city: {type: String},
  address: {type: String},
  phones: {type: String},

  title1: {type: String},
  subtitle1: {type: String},
  map_position: {type: String},
  map: {type: String},
  map_mobile: {type: String},
  imageBg1: {type: String},
  imageBg1_mobile: {type: String},

  title2_1: {type: String},
  title2_2: {type: String},
  phone1: {type: String},
  phone2: {type: String},
  phone3: {type: String},
  schedule: {type: String},

  title3: {type: String},
  subtitle3: {type: String},

  teachers: [{
    name: {type: String},
    position: {type: String},
    fb: {type: String},
    in: {type: String},
    photo: {type: String}
  }],

  gallery:  [],

});

salonsSchema.plugin(autoIncrement.plugin, {
  model: 'Salons',
  field: 'salons_id',
  startAt: 1,
  incrementBy: 1
});

exports.Salons = mongoose.model('Salons', salonsSchema);