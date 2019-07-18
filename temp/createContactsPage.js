var Contacts = require('../models/contacts').Contacts;

var newContactsPage = new Contacts({
  title1: 'Телефон:',
  title2: 'График работы:',

  kyivAddress: 'ул. Владимирская, 49 А',
  kyivPhone1: '067 550 18 15',
  kyivPhone2: '095 040 51 59',
  kyivTime1: 'Пн-Сб',
  kyivTime2: 'с 10:00 до 18:00',

  kharkivAddress: 'пр-т московский,  19/23',
  kharkivPhone1: '067 535 52 52',
  kharkivPhone2: '066 248 52 52',
  kharkivTime1: 'Пн-Пт',
  kharkivTime2: 'с 10:00 до 18:00',
});


newContactsPage.save(function (err, contacts) {
  if (err) {
    console.error(err);
  } else {
    console.log('Done');
  }
});