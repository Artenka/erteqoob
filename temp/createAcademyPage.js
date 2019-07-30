var Academy = require('../models/academy').Academy;

var newAcademyPage = new Academy({

});


newAcademyPage.save(function (err, academy) {
  if (err) {
    console.error(err);
  } else {
    console.log('Done');
  }
});