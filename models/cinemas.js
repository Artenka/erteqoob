var mongoose = require('../config/mongoose');
var autoIncrement = require('../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;

var cinemasSchema = new Schema({
  cinemas_id: {type: Number, unique: true},

  date: {type: String},
  time: {type: String},
  place: {type: String},
  place_link: {type: String},
  seats_current: {type: String},
  seats_total: {type: String},
  prices: [],
  fondy_id: {type: Number},
  fondy_price: {type: Number},

  subtitle1_1: {type: String},
  title1: {type: String},
  subtitle1_2: {type: String},
  videoBtn: {type: String},
  imageBg1: {type: String},
  video1: {type: String},

  subtitle2: {type: String},
  title2: {type: String},
  imageBg2: {type: String},
  block2_title1: {type: String},
  block2_text1: {type: String},
  block2_title2: {type: String},
  block2_text2: {type: String},
  block2_title3: {type: String},
  block2_text3: {type: String},
  block2_title4: {type: String},
  block2_text4: {type: String},

  title3: {type: String},
  subtitle3: {type: String},
  imageBg3: {type: String},

  title4: {type: String},
  subtitle4: {type: String},
  imageBg4: {type: String},

  title5: {type: String},
  subtitle5: {type: String},
  imageBg5: {type: String},

  title6: {type: String},
  subtitle6: {type: String},
  imageBg6: {type: String},

  title7: {type: String},
  subtitle7: {type: String},
  imageBg7: {type: String},

  title8: {type: String},
  subtitle8: {type: String},
  imageBg8: {type: String},

  title9: {type: String},
  imageBg9: {type: String},
  text9_1: {type: String},
  text9_2: {type: String},

});

cinemasSchema.plugin(autoIncrement.plugin, {
  model: 'Cinemas',
  field: 'cinemas_id',
  startAt: 1,
  incrementBy: 1
});

exports.Cinemas = mongoose.model('Cinemas', cinemasSchema);