/**
 * Created by Alexandr_G on 06.12.2016.
 */
var mongoose = require('../config/mongoose');
var autoIncrement = require('../config/mongoose').autoIncrement;

var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var bcrypt = require('bcrypt-nodejs');

var roles = 'customer admin superAdmin'.split(' ');
var roles_rus = 'Пользователь, Админ проекта, Админ сайта'.split(', ');

var statuses = 'active blocked'.split(' ');
var statuses_rus = 'Активный Заблокирован'.split(' ');

var userSchema = new Schema({
    user_id      : {type: Number, unique: true},
    email        : {
        type     : String,
        unique   : true,
        required : true,
        lowercase: true,
        trim     : true,
        match    : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,7}(?:\.[a-z]{2})?)$/i
    },
    password     : {type: String, trim: true},
    autoLoginHash: {type: String},
    created      : {type: Date, default: Date.now()},
    name         : {type: String, trim: true, minlength: 2},
    phone        : String,

    role  : {type: String, enum: roles, default: roles[0]},
    status: {type: String, enum: statuses, default: statuses[0]}, // оставляю из-за суперадмина, остальные через продукты

    products : [{
        product  : {type: Schema.Types.ObjectId, ref: 'Product'},
        plan: {type: Schema.Types.ObjectId, ref: 'Plan'},
        status: {type: String, enum: statuses, default: statuses[0]},
    }]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(autoIncrement.plugin, {
    model      : 'User',
    field      : 'user_id',
    startAt    : 1,
    incrementBy: 1
});

userSchema.plugin(deepPopulate);

exports.User = mongoose.model('User', userSchema);

exports.statuses = statuses;
exports.statuses_rus = statuses_rus;
exports.roles = roles;
exports.roles_rus = roles_rus;