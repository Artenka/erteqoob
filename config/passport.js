/**
 * Created by Alexandr_G on 06.12.2016.
 */
var LocalStrategy = require('passport-local').Strategy;

var Admin = require('../models/admin').Admin;
var crypto = require('crypto');

module.exports = function (passport) {

// passport session setup ==================================================

  /**
   * Serialize the user, determine what data is stored in session
   * done(null, user.id); - req.session.passport.user = {id: "user_id"}
   */
  passport.serializeUser(function (admin, done) {
    done(null, admin.id);
  });

  /**
   * Deserealize the user
   */
  passport.deserializeUser(function (id, done) {
    Admin.findById(id)
      .exec(function (err, admin) {
        done(err, admin);
      });
  });

// LOCAL LOGIN =============================================================
  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // pass in the request from route (check if a admin is logged in or not)
    },
    function (req, email, password, done) {
      if (email)
        email = email.toLowerCase().trim();

      // asynchronous
      process.nextTick(function () {
        Admin.findOne({'email': email}, function (err, admin) {
          if (err) return done(err);

          // if no admin is found, return the message
          if (!admin) {
            return done(null, false, req.flash('loginMessage', 'Пользователь не найден.'));
          }

          if (!admin.validPassword(password)) {
            return done(null, false, req.flash('loginMessage', 'Неправильный пароль!'));
          }

          // all is well, return admin
          else {
            var token = crypto.randomBytes(64).toString('hex');
            admin.autoLoginHash = token;
            admin.save(function (err) {
              if (err) console.error(err);
            });
            return done(null, admin);
          }
        });
      });

    }));
};