var Admin = require('../models/admin').Admin;

var newAdmin = new Admin({
    name    : 'Admin',
    lastName: 'Erteqoob',
    role    : 'admin',
    email   : 'admin@email.com',
    password: 'secret'
});

newAdmin.password = newAdmin.generateHash(newAdmin.password);

newAdmin.save(function(err, admin) {
    if (err) {
        console.error(err);
    } else {
        console.log('Done');
    }
});