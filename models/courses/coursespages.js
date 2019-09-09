var mongoose = require('../../config/mongoose');
var autoIncrement = require('../../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;

var coursespagesSchema = new Schema({
  coursespages_id : {type: Number, unique: true},

  name:  {type: String},
  title:  {type: String},
  subtitle:  {type: String},
  about_title:  {type: String},
  about_subtitle_1:  {type: String},
  about_subtitle_2:  {type: String},
  about_subtitle_3:  {type: String},

});

coursespagesSchema.plugin(autoIncrement.plugin, {
  model      : 'Coursespages',
  field      : 'coursespages_id',
  startAt    : 1,
  incrementBy: 1
});

exports.Coursespages = mongoose.model('Coursespages', coursespagesSchema);