var mongoose = require('../../config/mongoose');
var autoIncrement = require('../../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;

var salonsSchema = new Schema({
  salons_id: {type: Number, unique: true},
  priority: {type: Number, default: 0},

  name: {type: String},
  path: {type: String},
  city: {type: String},
  address: {type: String},
  phones: {type: String},

  section1_order: {type: Number, default: 0},
  title1: {type: String},
  subtitle1: {type: String},
  map_link: {type: String},
  map_position: {type: String},
  map: {type: String},
  map_mobile: {type: String},
  imageBg1: {type: String},
  imageBg1_mobile: {type: String},

  section2_order: {type: Number, default: 0},
  title2_1: {type: String},
  title2_2: {type: String},
  phone1: {type: String},
  phone2: {type: String},
  phone3: {type: String},
  schedule: {type: String},

  section3_order: {type: Number, default: 0},
  title3: {type: String},
  subtitle3: {type: String},

  teachers: [{
    name: {type: String},
    position: {type: String},
    fb: {type: String},
    in: {type: String},
    photo: {type: String}
  }],

  prices: [{
    name: {type: String},
    photo: {type: String},
    positions: [{
      name: {type: String},
      price: {type: String}
    }]
  }],

  section4_order: {type: Number, default: 0},
  gallery:  []

});

salonsSchema.plugin(autoIncrement.plugin, {
  model: 'Salons',
  field: 'salons_id',
  startAt: 1,
  incrementBy: 1
});

exports.Salons = mongoose.model('Salons', salonsSchema);