'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateToken = exports.login = undefined;

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = exports.login = function login(req, res) {
    _database2.default.first('UserId', 'Name', 'Password').from('TB_USERS').where({ Name: req.body.name, Password: req.body.password }).then(function (data) {
        if (data) {
            var token = _jsonwebtoken2.default.sign(data, 'competitions', { expiresIn: "1 day" });
            res.json({ token: token, name: data.Name, password: data.Password });
        } else {
            res.status(400).send({ error: "Wrong User/Password" });
        }
        console.log(data);
    }).catch(function (error) {
        res.json(error);
    });
};

var validateToken = exports.validateToken = function validateToken(req, res) {
    res.json({ validate: true });
};