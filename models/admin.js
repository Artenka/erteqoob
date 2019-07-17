var mongoose = require('../config/mongoose');
var autoIncrement = require('../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var statuses = 'active blocked'.split(' ');
var statuses_rus = 'Активный Заблокирован'.split(' ');

var adminSchema = new Schema({
    admin_id     : {type: Number, unique: true},
    email        : {
        type     : String,
        unique   : true,
        required : true,
        lowercase: true,
        trim     : true,
        match    : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,7}(?:\.[a-z]{2})?)$/i
    },
    password     : {type: String, trim: true},

    role         : {type: String, default: 'admin'},

    name         : {type: String, trim: true, minlength: 2},
    lastName     : {type: String, trim: true, minlength: 2},

    status       : {type: String, enum: statuses, default: statuses[0]},

    created      : {type: Date, default: Date.now()},
    autoLoginHash: {type: String}
});

adminSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
adminSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

adminSchema.plugin(autoIncrement.plugin, {
    model      : 'Admin',
    field      : 'admin_id',
    startAt    : 1,
    incrementBy: 1
});

exports.Admin = mongoose.model('Admin', adminSchema);

exports.statuses = statuses;
exports.statuses_rus = statuses_rus;