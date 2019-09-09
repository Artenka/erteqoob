var nodemailer = require('nodemailer');
var eLogger = require('../lib/logger').eLogger;

var Homepages = require('../models/homepages').Homepages;
var Philosophies = require('../models/philosophies').Philosophies;
var Academy = require('../models/academy').Academy;
var Contacts = require('../models/contacts').Contacts;
var Cinemas = require('../models/cinemas').Cinemas;

var Salonpages = require('../models/salons/salonpages').Salonpages;


module.exports = function (app, passport) {

  app.get('/', function(req, res, next) {
    Homepages.findOne({homepages_id: 1})
      .exec(function (err, homepages) {
        if (!err && homepages) {
          res.render('pages/home', {
            homepages: homepages
          });
        } else {
          eLogger.error(err);
          res.redirect('/');
        }
      });
  });

  app.get('/philosophy', function(req, res, next) {
    Philosophies.findOne({philosophies_id: 1})
      .exec(function (err, philosophies) {
        if (!err && philosophies) {
          res.render('pages/philosophy', {
            philosophies: philosophies
          });
        } else {
          eLogger.error(err);
          res.redirect('/');
        }
      });
  });
  app.get('/academy', function(req, res, next) {
    Academy.findOne({academy_id: 1})
      .exec(function (err, academy) {
        if (!err && academy) {
          res.render('pages/academy', {
            academy: academy
          });
        } else {
          eLogger.error(err);
          res.redirect('/');
        }
      });
  });
  app.get('/collections', function(req, res, next) {
    res.render('pages/collections');
  });
  app.get('/article', function(req, res, next) {
    res.render('pages/article');
  });
  app.get('/blog', function(req, res, next) {
    res.render('pages/blog');
  });
  // app.get('/courses', function(req, res, next) {
  //   res.render('pages/splash');
  // });
  // app.get('/salons', function(req, res, next) {
  //   Salonpages.findOne({salonpages_id: 1})
  //     .exec(function (err, salonpages) {
  //       if (!err && salonpages) {
  //         res.render('pages/salons', {
  //           salonpages: salonpages
  //         });
  //       } else {
  //         eLogger.error(err);
  //         res.redirect('/');
  //       }
  //     });
  // });
  // app.get('/salons/kost', function(req, res, next) {
  //   res.render('pages/salon-kost');
  // });
  // app.get('/salons/vlad', function(req, res, next) {
  //   res.render('pages/salon-vlad');
  // });
  // app.get('/salons/kharkiv', function(req, res, next) {
  //   res.render('pages/salon-kharkiv');
  // });
  app.get('/contacts', function(req, res, next) {
    Contacts.findOne({contacts_id: 1})
      .exec(function (err, contacts) {
        if (!err && contacts) {
          res.render('pages/contacts', {
            contacts: contacts
          });
        } else {
          eLogger.error(err);
          res.redirect('/');
        }
      });
  });


  // app.get('/courses/beginner', function(req, res, next) {
  //   res.render('pages/lp/courses-beginner');
  // });
  // app.get('/courses/pro', function(req, res, next) {
  //   res.render('pages/lp/courses-pro');
  // });

  app.get('/lp', function(req, res, next) {
    res.render('pages/lp/home');
  });

  app.get('/courses/expired', function(req, res, next) {
    res.render('pages/lp/sp-1-expired');
  });
  app.get('/courses/thankyou', function(req, res, next) {
    res.render('pages/lp/sp-1-thankyou');
  });
  app.get('/courses/thankyou/2', function(req, res, next) {
    res.render('pages/lp/sp-1-thankyou-2');
  });

  app.get('/sp/kiev', function(req, res, next) {
    res.render('pages/lp/sp-kiev');
  });
  app.get('/sp/kharkiv', function(req, res, next) {
    res.render('pages/lp/sp-kharkiv');
  });
  app.get('/sp1/kiev', function(req, res, next) {
    res.render('pages/lp/sp1-kiev');
  });
  app.get('/sp1/kharkiv', function(req, res, next) {
    res.render('pages/lp/sp1-kharkiv');
  });

  app.get('/webinar', function(req, res, next) {
    res.render('pages/lp/webinar');
  });

  app.get('/courses/beginner/base/kiev', function(req, res, next) {
    res.render('pages/lp/base-kiev');
  });
  app.get('/courses/beginner/base/kharkiv', function(req, res, next) {
    res.render('pages/lp/base-kharkiv');
  });

  app.get('/courses/beginner/qualification/kiev', function(req, res, next) {
    res.render('pages/lp/qualification-kiev');
  });
  app.get('/courses/beginner/qualification/kharkiv', function(req, res, next) {
    res.render('pages/lp/qualification-kharkiv');
  });

  app.get('/courses/pro/adaptation/kiev', function(req, res, next) {
    res.render('pages/lp/adaptation-kiev');
  });
  app.get('/courses/pro/adaptation/kharkiv', function(req, res, next) {
    res.render('pages/lp/adaptation-kharkiv');
  });

  app.get('/courses/pro/man-innovations/kiev', function(req, res, next) {
    res.render('pages/lp/man-innovations-kiev');
  });
  app.get('/courses/pro/man-innovations/kharkiv', function(req, res, next) {
    res.render('pages/lp/man-innovations-kharkiv');
  });

  app.get('/courses/pro/salon-innovations/kiev', function(req, res, next) {
    res.render('pages/lp/salon-innovations-kiev');
  });
  app.get('/courses/pro/salon-innovations/kharkiv', function(req, res, next) {
    res.render('pages/lp/salon-innovations-kharkiv');
  });

  app.get('/courses/pro/long/kiev', function(req, res, next) {
    res.render('pages/lp/long-kiev');
  });
  app.get('/courses/pro/long/kharkiv', function(req, res, next) {
    res.render('pages/lp/long-kharkiv');
  });

  app.get('/courses/pro/curly/kiev', function(req, res, next) {
    res.render('pages/lp/curly-kiev');
  });
  app.get('/courses/pro/curly/kharkiv', function(req, res, next) {
    res.render('pages/lp/curly-kharkiv');
  });

  app.get('/courses/pro/blond/kiev', function(req, res, next) {
    res.render('pages/lp/blond-kiev');
  });
  app.get('/courses/pro/blond/kharkiv', function(req, res, next) {
    res.render('pages/lp/blond-kharkiv');
  });

  app.get('/cinema', function(req, res, next) {
    Cinemas.findOne({cinemas_id: 1})
      .exec(function (err, cinemas) {
        if (!err && cinemas) {
          res.render('pages/lp/cinema', {
            cinemas: cinemas
          });
        } else {
          eLogger.error(err);
          res.redirect('/');
        }
      });
  });
  // app.get('/courses/pro/cinema/kharkiv', function(req, res, next) {
  //   res.render('pages/lp/cinema-kharkiv');
  // });

  app.get('/courses/pro/gbw', function(req, res, next) {
    res.render('pages/lp/gbw-base');
  });
  app.get('/courses/pro/gbw/grey/kiev', function(req, res, next) {
    res.render('pages/lp/gbw-grey-kiev');
  });
  app.get('/courses/pro/gbw/grey/kharkiv', function(req, res, next) {
    res.render('pages/lp/gbw-grey-kharkiv');
  });
  app.get('/courses/pro/gbw/black/kiev', function(req, res, next) {
    res.render('pages/lp/gbw-black-kiev');
  });
  app.get('/courses/pro/gbw/black/kharkiv', function(req, res, next) {
    res.render('pages/lp/gbw-black-kharkiv');
  });
  app.get('/courses/pro/gbw/white/kiev', function(req, res, next) {
    res.render('pages/lp/gbw-white-kiev');
  });
  app.get('/courses/pro/gbw/white/kharkiv', function(req, res, next) {
    res.render('pages/lp/gbw-white-kharkiv');
  });


  app.get('/in-development', function(req, res, next) {
    res.render('pages/indev');
  });

  app.get('/login', function(req, res, next) {
    res.render('pages/admin/login', {
      message: req.flash('loginMessage')
    });
  });

  app.post("/login", passport.authenticate('local-login',
    {
      successRedirect: '/admin',
      failureRedirect: '/login',
      failureFlash   : true
    }), function (req, res) {

    if (req.body.rememberMe) {
      req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000; // Cookie expires after 365 days
    } else {
      req.session.cookie.expires = false; // Cookie expires at end of session
    }
  });

  app.get('/logout', function (req, res) {
    req.session.destroy(req.session);
    req.logout();
    res.redirect('/');
  });

  app.get('/admin', function(req, res, next) {
    if (req.isAuthenticated ()) {
      next();
    } else {
      res.redirect ('/login');
    }
  });

};


