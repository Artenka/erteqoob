var express = require('express');
var router = express.Router();

var Salonpages = require('../../models/salons/salonpages').Salonpages;
var Salons = require('../../models/salons/salons').Salons;

var eLogger = require('../../lib/logger').eLogger;

var async = require('async');

var isLoggedInAdmin = require('../../lib/authenticated').isLoggedInAdmin;
router.use(isLoggedInAdmin);

// Storage
var multer = require('multer');
const storageSalons = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/files/salons/');
  },
  filename   : function (req, file, callback) {
    var secs = new Date().getTime();
    callback(null, secs + '_' + file.originalname.replace(/\s/g, '_'));
  }
});

router.get('/page', function (req, res) {
  Salonpages.findOne({salonpages_id: 1})
    .exec(function (err, salonpages) {
      if (!err && salonpages) {
        res.render('pages/admin/salons/admin-salons-page', {
          user: req.user,
          salonpages: salonpages
        });
      } else {
        eLogger.error(err);
        res.redirect('/admin');
      }
    });
});

router.post('/page', function(req, res) {
  Salonpages.findOne({salonpages_id: 1}, function (err, salonpages) {
    if (!err && salonpages) {
      salonpages.title = req.body.title;
      salonpages.subtitle = req.body.subtitle;

      salonpages.save(function (err, item) {
        if (err) {
          eLogger.error(err);
          req.session.err_message = 'Ошибка сохранения страницы';
          res.redirect('/admin/salons' + req.params.id);
        } else {
          res.redirect('/admin/salons');
        }
      });
    } else {
      eLogger.error(err);
      req.session.err_message = 'Ошибка сохранения страницы';
      res.redirect('/admin' + req.params.id);
    }
  });
});

router.get('/', function(req, res) {
  res.render('pages/admin/salons/admin-salons-list', {
    user: req.user
  });
});


router.get('/list', function(req, res) {
  Salons.find({})
    .exec(function (err, salons) {
      if (!err) {
        var list = {
          data: []
        };

        salons.forEach(function (salon) {
          list.data.push([
            salon.salons_id,
            salon.name,
            salon.priority,
            salon.salons_id,
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


router.get('/new', function (req, res) {
  res.render('pages/admin/salons/admin-salons-new', {
    user: req.user
  });
});

router.post('/new', function (req, res) {
  var uploadImage = multer({storage: storageSalons}).fields([
    {name: 'map', maxCount: 1},
    {name: 'map_mobile', maxCount: 1},
    {name: 'imageBg1', maxCount: 1},
    {name: 'imageBg1_mobile', maxCount: 1},
    {name: 'gallery'},
    {name: 'teachers_photo'}
  ]);

  uploadImage(req, res, function (err) {
    if (err) {
      eLogger.error(err);
      res.render('pages/admin/salons/admin-salons-new', {
        user: req.user,
        message: 'Ошибка сохранения изображения'
      });
    } else {

      var salons = new Salons({});

      salons.name = req.body.name;
      salons.path = req.body.path;
      salons.city = req.body.city;
      salons.address = req.body.address;
      salons.phones = req.body.phones;

      salons.section1_order = req.body.section1_order;
      salons.title1 = req.body.title1;
      salons.subtitle1 = req.body.subtitle1;
      salons.map_link = req.body.map_link;
      salons.map_position = req.body.map_position;
      salons.map = req.body.map;
      salons.map_mobile = req.body.map_mobile;
      salons.imageBg1 = req.body.imageBg1;
      salons.imageBg1_mobile = req.body.imageBg1_mobile;

      salons.section2_order = req.body.section2_order;
      salons.title2_1 = req.body.title2_1;
      salons.title2_2 = req.body.title2_2;
      salons.phone1 = req.body.phone1;
      salons.phone2 = req.body.phone2;
      salons.phone3 = req.body.phone3;
      salons.schedule = req.body.schedule;

      salons.section3_order = req.body.section3_order;
      salons.title3 = req.body.title3;
      salons.subtitle3 = req.body.subtitle3;

      salons.section4_order = req.body.section4_order;

      var newPath;

      if (req.body.imageBg1_deleted == 'false') {
        if (req.files.imageBg1) {
          newPath = req.files.imageBg1[0].path;
          newPath = newPath.split('\\').join('/');
          salons.imageBg1 = newPath.replace('public', '');
        }
      } else {
        salons.imageBg1 = '';
      }

      if (req.body.imageBg1_mobile_deleted == 'false') {
        if (req.files.imageBg1_mobile) {
          newPath = req.files.imageBg1_mobile[0].path;
          newPath = newPath.split('\\').join('/');
          salons.imageBg1_mobile = newPath.replace('public', '');
        }
      } else {
        salons.imageBg1_mobile = '';
      }

      if (req.body.map_deleted == 'false') {
        if (req.files.map) {
          newPath = req.files.map[0].path;
          newPath = newPath.split('\\').join('/');
          salons.map = newPath.replace('public', '');
        }
      } else {
        salons.map = '';
      }

      if (req.body.map_mobile_deleted == 'false') {
        if (req.files.map_mobile) {
          newPath = req.files.map_mobile[0].path;
          newPath = newPath.split('\\').join('/');
          salons.map_mobile = newPath.replace('public', '');
        }
      } else {
        salons.map_mobile = '';
      }

      var teachers_name = req.body.teachers_name instanceof Array ? req.body.teachers_name : [req.body.teachers_name];
      var teachers_position = req.body.teachers_position instanceof Array ? req.body.teachers_position : [req.body.teachers_position];
      var teachers_fb = req.body.teachers_fb instanceof Array ? req.body.teachers_fb : [req.body.teachers_fb];
      var teachers_in = req.body.teachers_in instanceof Array ? req.body.teachers_in : [req.body.teachers_in];
      var teachersPath = req.body.teachersPath instanceof Array ? req.body.teachersPath : [req.body.teachersPath];
      var teachers_deleted = req.body.teachers_deleted instanceof Array ? req.body.teachers_deleted : [req.body.teachers_deleted];

      var teachersArray = [];
      var photoPath = '';
      var i = 0;
      teachersPath.forEach(function(item, index) {
        if(item === '' && teachers_deleted[index] === 'false') {
          if(req.files.teachers_photo) {
            if(typeof req.files.teachers_photo[i] !== 'undefined') {
              photoPath = req.files.teachers_photo[i].path;
              photoPath = photoPath.split('\\').join('/');
              photoPath = photoPath.replace('public', '');
              i++;
            }
          }
        } else {
          photoPath = item;
        }
        teachersArray.push({
          name: teachers_name[index],
          position: teachers_position[index],
          fb: teachers_fb[index],
          in: teachers_in[index],
          photo: photoPath
        });
      });

      salons.teachers = teachersArray;


      var galleryList = [];
      if(req.body.galleryPath) {
        if(typeof req.body.galleryPath === 'string') {
          galleryList.push(req.body.galleryPath);
        } else {
          galleryList = req.body.galleryPath.filter(function (el) {
            return el != '';
          });
        }
      }
      if (req.files.gallery) {
        req.files.gallery.forEach(function (item, index) {
          newPath = item.path;
          newPath = newPath.split('\\').join('/');
          newPath = newPath.replace('public', '');
          galleryList.push(newPath);
        });
      }
      salons.gallery = galleryList;


      salons.save(function (err, item) {
        if (err) {
          eLogger.error(err);
          res.render('pages/admin/salons/admin-salons-new', {
            user: req.user,
            salons: salons,
            message: 'Ошибка сохранения салона'
          });
        } else {
          res.redirect('/admin/salons');
        }
      });
    }
  });
});

router.get('/actions', function(req, res) {
  Salons.find({salons_id: req.query.contacts}, function(err, salons) {
    if (!err && salons) {
      async.each(salons, function(salon, callback) {

        if (req.query.action === "up") {
          salon.priority += 1;
        } else if (req.query.action === "down") {
          if (salon.priority > 0) {
            salon.priority -= 1;
          }
        }

        salon.save(function(err, item) {
          if (err) {
            eLogger.error(err);
            console.error(err);
          }
        });

        callback();
      }, function(err) {
        if (err) {
          res.send({result: 0});
        }
        res.send({result: 1});
      });
    } else {
      res.send({result: 0});
    }
  });
});

router.get('/:id', function(req, res) {
  Salons.findOne({salons_id: req.params.id})
    .exec(function (err, salons) {
      if (!err && salons) {
        res.render('pages/admin/salons/admin-salons-edit', {
          user: req.user,
          salons: salons
        });
      } else {
        eLogger.error(err);
        res.redirect('/admin/salons');
      }
    });
});

router.post('/:id/edit', function(req, res) {
  Salons.findOne({salons_id: req.params.id})
    .exec(function (err, salons) {
      if (!err && salons) {
        var uploadImage = multer({storage: storageSalons}).fields([
          {name: 'map', maxCount: 1},
          {name: 'map_mobile', maxCount: 1},
          {name: 'imageBg1', maxCount: 1},
          {name: 'imageBg1_mobile', maxCount: 1},
          {name: 'teachers_photo'},
          {name: 'prices_photo'},
          {name: 'gallery'}
        ]);

        uploadImage(req, res, function (err) {
          if (err) {
            eLogger.error(err);
            res.render('pages/admin/salons/admin-salons-edit', {
              user    : req.user,
              salons    : salons,
              message : 'Ошибка сохранения изображения'
            });
          } else {
            salons.name = req.body.name;
            salons.path = req.body.path;
            salons.city = req.body.city;
            salons.address = req.body.address;
            salons.phones = req.body.phones;

            salons.section1_order = req.body.section1_order;
            salons.title1 = req.body.title1;
            salons.subtitle1 = req.body.subtitle1;
            salons.map_link = req.body.map_link;
            salons.map_position = req.body.map_position;
            salons.map = req.body.map;
            salons.map_mobile = req.body.map_mobile;
            salons.imageBg1 = req.body.imageBg1;
            salons.imageBg1_mobile = req.body.imageBg1_mobile;

            salons.section2_order = req.body.section2_order;
            salons.title2_1 = req.body.title2_1;
            salons.title2_2 = req.body.title2_2;
            salons.phone1 = req.body.phone1;
            salons.phone2 = req.body.phone2;
            salons.phone3 = req.body.phone3;
            salons.schedule = req.body.schedule;

            salons.section3_order = req.body.section3_order;
            salons.title3 = req.body.title3;
            salons.subtitle3 = req.body.subtitle3;

            salons.section4_order = req.body.section4_order;


            var newPath;

            if (req.body.imageBg1_deleted == 'false') {
              if (req.files.imageBg1) {
                newPath = req.files.imageBg1[0].path;
                newPath = newPath.split('\\').join('/');
                salons.imageBg1 = newPath.replace('public', '');
              } else {
                salons.imageBg1 = req.body.imageBg1_path;
              }
            } else {
              salons.imageBg1 = '';
            }

            if (req.body.imageBg1_mobile_deleted == 'false') {
              if (req.files.imageBg1_mobile) {
                newPath = req.files.imageBg1_mobile[0].path;
                newPath = newPath.split('\\').join('/');
                salons.imageBg1_mobile = newPath.replace('public', '');
              } else {
                salons.imageBg1_mobile = req.body.imageBg1_mobile_path;
              }
            } else {
              salons.imageBg1_mobile = '';
            }

            if (req.body.map_deleted == 'false') {
              if (req.files.map) {
                newPath = req.files.map[0].path;
                newPath = newPath.split('\\').join('/');
                salons.map = newPath.replace('public', '');
              } else {
                salons.map = req.body.map_path;
              }
            } else {
              salons.map = '';
            }

            if (req.body.map_mobile_deleted == 'false') {
              if (req.files.map_mobile) {
                newPath = req.files.map_mobile[0].path;
                newPath = newPath.split('\\').join('/');
                salons.map_mobile = newPath.replace('public', '');
              } else {
                salons.map_mobile = req.body.map_mobile_path;
              }
            } else {
              salons.map_mobile = '';
            }


            var teachers_name = req.body.teachers_name instanceof Array ? req.body.teachers_name : [req.body.teachers_name];
            var teachers_position = req.body.teachers_position instanceof Array ? req.body.teachers_position : [req.body.teachers_position];
            var teachers_fb = req.body.teachers_fb instanceof Array ? req.body.teachers_fb : [req.body.teachers_fb];
            var teachers_in = req.body.teachers_in instanceof Array ? req.body.teachers_in : [req.body.teachers_in];
            var teachersPath = req.body.teachersPath instanceof Array ? req.body.teachersPath : [req.body.teachersPath];
            var teachers_deleted = req.body.teachers_deleted instanceof Array ? req.body.teachers_deleted : [req.body.teachers_deleted];

            var teachersArray = [];
            var photoPath = '';
            var i = 0;
            teachersPath.forEach(function(item, index) {
              if(item === '' && teachers_deleted[index] === 'false') {
                if(req.files.teachers_photo) {
                  if(typeof req.files.teachers_photo[i] !== 'undefined') {
                    photoPath = req.files.teachers_photo[i].path;
                    photoPath = photoPath.split('\\').join('/');
                    photoPath = photoPath.replace('public', '');
                    i++;
                  }
                }
              } else {
                photoPath = item;
              }
              teachersArray.push({
                name: teachers_name[index],
                position: teachers_position[index],
                fb: teachers_fb[index],
                in: teachers_in[index],
                photo: photoPath
              });
            });

            salons.teachers = teachersArray;



            var prices_name = req.body.prices_name instanceof Array ? req.body.prices_name : [req.body.prices_name];
            var pricesPath = req.body.pricesPath instanceof Array ? req.body.pricesPath : [req.body.pricesPath];
            var prices_deleted = req.body.prices_deleted instanceof Array ? req.body.prices_deleted : [req.body.prices_deleted];
            var prices_positions_name = [];
            var prices_positions_price = [];

            var pricesArray = [];
            var pricesPositionsArray = [];
            photoPath = '';
            i = 0;
            pricesPath.forEach(function (item, index) {
              if (item === '' && prices_deleted[index] === 'false') {
                if (req.files.prices_photo) {
                  if (typeof req.files.prices_photo[i] !== 'undefined') {
                    photoPath = req.files.prices_photo[i].path;
                    photoPath = photoPath.split('\\').join('/');
                    photoPath = photoPath.replace('public', '');
                    i++;
                  }
                }
              } else {
                photoPath = item;
              }


              pricesPositionsArray = [];

              if(typeof req.body['prices_positions_'+ (parseInt(index, 10)+1) +'_name'] !== 'undefined') {
                prices_positions_name = req.body['prices_positions_'+ (parseInt(index, 10)+1) +'_name'] instanceof Array ? req.body['prices_positions_'+ (parseInt(index, 10)+1) +'_name'] : [req.body['prices_positions_'+ (parseInt(index, 10)+1) +'_name']];
                prices_positions_price = req.body['prices_positions_'+ (parseInt(index, 10)+1) +'_price'] instanceof Array ? req.body['prices_positions_'+ (parseInt(index, 10)+1) +'_price'] : [req.body['prices_positions_'+ (parseInt(index, 10)+1) +'_price']];

                prices_positions_name.forEach(function (positionsItem, positionsIndex) {
                  pricesPositionsArray.push({
                    name: prices_positions_name[positionsIndex],
                    price: prices_positions_price[positionsIndex]
                  });
                });
              }


              pricesArray.push({
                name: prices_name[index],
                photo: photoPath,
                positions: pricesPositionsArray
              });
            });


            salons.prices = pricesArray;



            var galleryList = [];
            if(req.body.galleryPath) {
              if(typeof req.body.galleryPath === 'string') {
                galleryList.push(req.body.galleryPath);
              } else {
                galleryList = req.body.galleryPath.filter(function (el) {
                  return el != '';
                });
              }
            }
            if (req.files.gallery) {
              req.files.gallery.forEach(function (item, index) {
                newPath = item.path;
                newPath = newPath.split('\\').join('/');
                newPath = newPath.replace('public', '');
                galleryList.push(newPath);
              });
            }
            salons.gallery = galleryList;



            salons.save(function (err, item) {
              if (err) {
                eLogger.error(err);
                res.render('pages/admin/salons/admin-salons-edit', {
                  user    : req.user,
                  salons    : salons,
                  message : 'Ошибка сохранения салона'
                });
              } else {
                res.redirect('/admin/salons');
              }
            });
          }
        });
      } else {
        eLogger.error(err);
        res.redirect('/admin/salons');
      }
    });
});

router.get('/:id/delete', function(req, res) {
  Salons.findOne ({salons_id: req.params.id}, function (err, salons) {
    if (!err && salons) {
      salons.remove (function (err, item) {
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