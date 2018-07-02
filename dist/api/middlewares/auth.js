'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authSecret = 'competitions';

exports.default = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    var token = req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    _jsonwebtoken2.default.verify(token, authSecret, function (err, decoded) {
        if (err) {
            return res.status(401).send({
                error: 'Failed to authenticate token.'
            });
        }
        req.decoded = decoded;
        next();
    });
};