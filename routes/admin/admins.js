var express = require('express');
var router = express.Router();

var Admin = require('../../models/admin').Admin;

var eLogger = require('../../lib/logger').eLogger;

var async = require('async');

var isLoggedInAdmin = require('../../lib/authenticated').isLoggedInAdmin;
router.use(isLoggedInAdmin);

router.get('/', function(req, res) {
    res.render('pages/admin/admin-admins-list', {
        user: req.user
    });
});

router.get('/list', function(req, res) {
    Admin.find({})
        .exec(function (err, admins) {
            if (!err) {
                var list = {
                    data: []
                };

                admins.forEach(function (admin) {
                    list.data.push([
                        admin.admin_id,
                        admin.admin_id,
                        admin.name + ' ' + admin.lastName,
                        admin.email,
                        admin.status,
                        admin.admin_id
                    ]);
                });

                res.send(list);
            } else {
                eLogger.error(err);
                res.send({
                    list: []
                });
            }
        });
});

router.get('/action', function (req, res) {
    Admin.find({admin_id: {$in: req.query.contacts}}, function (err, admins) {
        if (!err && admins) {
            async.each(admins, function (admin, callback) {
                if (req.query.action === "activate") {
                    admin.status = 'active';
                } else if (req.query.action === "block") {
                    admin.status = 'blocked';
                }

                admin.save(function (err, item) {
                    if (err) {
                        eLogger.error(err);
                        callback();
                    } else {
                        callback();
                    }
                });
            }, function (err) {
                if (err) {
                    eLogger.error(err);
                    res.send({result: 0});
                } else {
                    res.send({result: 1});
                }
            });
        } else {
            eLogger.error(err);
            res.send({result: 0});
        }
    });
});

router.get('/new', function(req, res) {
    res.render('pages/admin/admin-admin-new', {
        user: req.user
    });
});

router.post('/new', function(req, res) {
    Admin.findOne({email: req.body.email.toLowerCase().trim()}, function (err, admin) {
        if (err) {
            res.render('pages/admin/admin-admin-new', {
                user    : req.user,
                message : 'Error search administrator'
            });
        } else if (admin) {
            res.render('pages/admin/admin-admin-new', {
                user    : req.user,
                message : 'An administrator with this email is already exist in the system'
            });
        } else {
            var newAdmin = new Admin({
                email      : req.body.email.toLowerCase().trim(),
                password   : req.body.password,
                name       : req.body.name,
                lastName   : req.body.lastName
            });

            newAdmin.password = newAdmin.generateHash(newAdmin.password);

            newAdmin.save(function (err, item) {
                if (err) {
                    eLogger.error(err);
                    res.render('pages/admin/admin-admin-new', {
                        user    : req.user,
                        message : 'Error save administrator'
                    });
                } else {
                    res.redirect('/admin/admins');
                }
            });
        }
    });
});

router.get('/:id', function(req, res) {
    Admin.findOne({admin_id: req.params.id}, function (err, admin) {
        if (!err && admin) {
            res.render('pages/admin/admin-admin-card', {
                user : req.user,
                admin: admin
            });
        } else {
            eLogger.error(err);
            res.redirect('/admin/admins');
        }
    });
});

router.post('/:id/edit', function(req, res) {
    Admin.findOne({admin_id: req.params.id}, function (err, admin) {
        if (!err && admin) {
            admin.email = req.body.email;
            admin.name = req.body.name;
            admin.lastName = req.body.lastName;

            if (req.body.password) {
                admin.password = admin.generateHash(req.body.password);
            }

            admin.save(function (err, item) {
                if (err) {
                    eLogger.error(err);
                    res.render('pages/admin/admin-admin-card', {
                        user    : req.user,
                        admin   : admin,
                        message : 'Error save administrator'
                    });
                } else {
                    res.redirect('/admin/admins');
                }
            });
        } else {
            eLogger.error(err);
            res.render('pages/admin/admin-admin-card', {
                user    : req.user,
                message : 'Error search administrator'
            });
        }
    });
});

router.get('/:id/delete', function(req, res) {
    Admin.findOne ({admin_id: req.params.id}, function (err, admin) {
        if (!err && admin) {
            admin.remove (function (err, item) {
                if (err) {
                    eLogger.error (err);
                    res.send ({result: 0});
                } else {
                    res.send ({result: 1});
                }
            });
        }
    });
});

module.exports = router;