var Coursespages = require('../models/courses/coursespages').Coursespages;

var newCoursespages = new Coursespages({
  "name" : "beginner"
});


newCoursespages.save(function (err, coursespages) {
  if (err) {
    console.error(err);
  } else {
    console.log('Done');
  }
});