var mongoose = require('../config/mongoose');
var autoIncrement = require('../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;

var homepagesSchema = new Schema({

  homepages_id: {type: Number, unique: true},

  imageBg1: {type: String},
  title1_1: {type: String},
  subtitle1_1: {type: String},
  image1_1: {type: String},
  title1_2: {type: String},
  subtitle1_2: {type: String},
  image1_2: {type: String},
  title1_3: {type: String},
  subtitle1_3: {type: String},
  image1_3: {type: String},

  imageBg2: {type: String},
  title2: {type: String},
  subtitle2_1: {type: String},
  subtitle2_2: {type: String},
  subtitle2_3: {type: String},
  subtitle2_4: {type: String},
  number2_1: {type: String},
  numberSubtitle2_1: {type: String},
  number2_2: {type: String},
  numberSubtitle2_2: {type: String},
  number2_3: {type: String},
  numberSubtitle2_3: {type: String},
  number2_4: {type: String},
  numberSubtitle2_4: {type: String},
  number2_5: {type: String},
  numberSubtitle2_5: {type: String},

  title3: {type: String},
  name3_1: {type: String},
  position3_1: {type: String},
  photo3_1: {type: String},
  name3_2: {type: String},
  position3_2: {type: String},
  photo3_2: {type: String},
  name3_3: {type: String},
  position3_3: {type: String},
  photo3_3: {type: String},

  title4: {type: String},
  imageBg4: {type: String},
  text4_1: {type: String},
  text4_2: {type: String},
  text4_3: {type: String},
  text4_4: {type: String},

});

homepagesSchema.plugin(autoIncrement.plugin, {
  model: 'Homepages',
  field: 'homepages_id',
  startAt: 1,
  incrementBy: 1
});

exports.Homepages = mongoose.model('Homepages', homepagesSchema);