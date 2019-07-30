var mongoose = require('../config/mongoose');
var autoIncrement = require('../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;

var contactsSchema = new Schema({
  contacts_id : {type: Number, unique: true},

  title1:  {type: String},
  title2:  {type: String},

  kyivAddress:  {type: String},
  kyivPhone1:  {type: String},
  kyivPhone2:  {type: String},
  kyivTime1:  {type: String},
  kyivTime2:  {type: String},
  kyivGallery:  [],

  kharkivAddress:  {type: String},
  kharkivPhone1:  {type: String},
  kharkivPhone2:  {type: String},
  kharkivTime1:  {type: String},
  kharkivTime2:  {type: String},
  kharkivGallery:  [],

});

contactsSchema.plugin(autoIncrement.plugin, {
  model      : 'Contacts',
  field      : 'contacts_id',
  startAt    : 1,
  incrementBy: 1
});

exports.Contacts = mongoose.model('Contacts', contactsSchema);