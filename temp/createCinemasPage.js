var Cinemas = require('../models/cinemas').Cinemas;

var newCinemasPage = new Cinemas({

});


newCinemasPage.save(function (err, cinemas) {
  if (err) {
    console.error(err);
  } else {
    console.log('Done');
  }
});