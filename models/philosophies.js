var mongoose = require('../config/mongoose');
var autoIncrement = require('../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;

var philosophySchema = new Schema({
  philosophies_id: {type: Number, unique: true},

  title1: {type: String},
  subtitle1: {type: String},
  imageBg1: {type: String},

  title2: {type: String},
  text2: {type: String},
  imageBg2: {type: String},

  title3: {type: String},
  text3: {type: String},
  imageBg3: {type: String},

  title4: {type: String},
  text4: {type: String},
  imageBg4: {type: String},

  title5: {type: String},
  subtitle5: {type: String},
  imageBg5: {type: String},

  title5_1: {type: String},
  subtitle5_1: {type: String},
  imageBg5_1: {type: String},
  text5_1: {type: String},

  title5_2: {type: String},
  subtitle5_2: {type: String},
  imageBg5_2: {type: String},
  text5_2: {type: String},

  title5_3: {type: String},
  subtitle5_3: {type: String},
  imageBg5_3: {type: String},
  text5_3: {type: String},

  title5_4: {type: String},
  subtitle5_4: {type: String},
  imageBg5_4: {type: String},
  text5_4: {type: String},

  title6: {type: String},
  imageBg6: {type: String},
  text6_1: {type: String},
  text6_2: {type: String},
  text6_3: {type: String},

  title7: {type: String},
  imageBg7: {type: String},
  text7_1: {type: String},
  text7_2: {type: String},
  text7_3: {type: String},

  title8: {type: String},
  imageBg8: {type: String},
  btn8: {type: String},

});

philosophySchema.plugin(autoIncrement.plugin, {
  model: 'Philosophies',
  field: 'philosophies_id',
  startAt: 1,
  incrementBy: 1
});

exports.Philosophies = mongoose.model('Philosophies', philosophySchema);