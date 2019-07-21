var Philosophies = require('../models/philosophies').Philosophies;

var newPhilosophiesPage = new Philosophies({
  title1: 'ФИЛОСОФИЯ',
});


newPhilosophiesPage.save(function (err, philosophies) {
  if (err) {
    console.error(err);
  } else {
    console.log('Done');
  }
});