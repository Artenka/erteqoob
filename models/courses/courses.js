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
  development: {type: String},
  preview: {type: String},

  pages: [{
    city: {type: String},
    blocks: [{
      block_type: {type: String},
      title: {type: String},
      subtitle: {type: String},
      bg: {type: String},
      text: {type: String},
      duration: {type: String},
      date: {type: String},
      seats_current: {type: String},
      seats_total: {type: String},

      item_1_title: {type: String},
      item_1_text: {type: String},
      item_1_name: {type: String},
      item_1_image: {type: String},
      item_1_fb: {type: String},
      item_1_in: {type: String},

      item_2_title: {type: String},
      item_2_text: {type: String},
      item_2_name: {type: String},
      item_2_image: {type: String},
      item_2_fb: {type: String},
      item_2_in: {type: String},

      item_3_title: {type: String},
      item_3_text: {type: String},
      item_3_name: {type: String},
      item_3_image: {type: String},
      item_3_fb: {type: String},
      item_3_in: {type: String},

      item_4_title: {type: String},
      item_4_text: {type: String},
      item_4_image: {type: String},
      item_4_fb: {type: String},
      item_4_in: {type: String},

      item_5_title: {type: String},
      item_5_text: {type: String},
      item_5_image: {type: String},
      item_5_fb: {type: String},
      item_5_in: {type: String},

      item_6_title: {type: String},
      item_6_text: {type: String},
      item_6_image: {type: String},

      item_7_title: {type: String},
      item_7_text: {type: String},

      item_8_title: {type: String},
      item_8_text: {type: String},

      item_9_title: {type: String},
      item_9_text: {type: String},

      item_1_1_title: {type: String},
      item_1_1_text: {type: String},

      item_1_2_title: {type: String},
      item_1_2_text: {type: String},

      item_1_3_title: {type: String},
      item_1_3_text: {type: String},

      item_2_1_title: {type: String},
      item_2_1_text: {type: String},

      item_2_2_title: {type: String},
      item_2_2_text: {type: String},

      item_2_3_title: {type: String},
      item_2_3_text: {type: String},

      item_3_1_title: {type: String},
      item_3_1_text: {type: String},

      item_3_2_title: {type: String},
      item_3_2_text: {type: String},

      item_3_3_title: {type: String},
      item_3_3_text: {type: String},

      text_left: {type: String},
      text_right: {type: String},
      price: {type: String},
      prepayment: {type: String},
      discount: {type: String},

      subtitle_1: {type: String},
      subtitle_2: {type: String},
      title_btn_1: {type: String},

      btn_1_text: {type: String},
      btn_1_link: {type: String},
      btn_2_text: {type: String},
      btn_2_link: {type: String},

      block_word_1: {type: String},
      block_word_2: {type: String},
      block_word_3: {type: String},
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