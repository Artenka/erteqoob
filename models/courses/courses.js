var mongoose = require('../../config/mongoose');
var autoIncrement = require('../../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;

var coursesSchema = new Schema({
  courses_id: {type: Number, unique: true},
  priority: {type: Number, default: 0},

  name: {type: String},
  path: {type: String},
  course_type: {type: String},
  date: {type: String},
  duration: {type: String},
  difficulty: {type: String},
  preview: {type: String},

  pages: [{
    city: {type: String},
    blocks: [{
      block_type: {type: String},
    }]
  }],


});

coursesSchema.plugin(autoIncrement.plugin, {
  model: 'Courses',
  field: 'courses_id',
  startAt: 1,
  incrementBy: 1
});

exports.Courses = mongoose.model('Courses', coursesSchema);