var Salons = require('../models/salons/salons').Salons;

var newSalonsPage = new Salons({

});


newSalonsPage.save(function (err, salons) {
  if (err) {
    console.error(err);
  } else {
    console.log('Done');
  }
});