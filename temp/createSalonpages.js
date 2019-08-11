var Salonpages = require('../models/salons/salonpages').Salonpages;

var newSalonpages = new Salonpages({
  "subtitle" : "настоящий комфорт \r\nдля создания уникального \r\nобраза",
  "title" : "салоны"
});


newSalonpages.save(function (err, salonpages) {
  if (err) {
    console.error(err);
  } else {
    console.log('Done');
  }
});