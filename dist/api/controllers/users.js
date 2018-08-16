'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.update = exports.create = exports.get = exports.list = undefined;

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var list = exports.list = function list(req, res) {
    _database2.default.select('UserId', 'Name', 'ProfileId').from('TB_USERS').then(function (result) {
        var response = {
            resultCode: 1,
            resultMessage: 'Operação realizada com sucesso',
            data: result
        };
        res.json(response);
    });
};

var get = exports.get = function get(req, res) {
    _database2.default.first('UserId', 'Name', 'ProfileId').from('TB_USERS').where({ UserId: req.params.userId }).then(function (result) {
        var response = {
            resultCode: 1,
            resultMessage: 'Operação realizada com sucesso',
            data: result
        };
        res.json(response);
    });
};

var create = exports.create = function create(req, res) {
    _database2.default.table('TB_USERS').insert({ Name: req.body.name, Password: req.body.password, ProfileId: req.body.profileId }).then(function (result) {
        var response = {
            resultCode: 1,
            resultMessage: 'Operação realizada com sucesso'
        };
        res.json(response);
    });
};

var update = exports.update = function update(req, res) {
    _database2.default.from('TB_USERS').where({ UserId: req.params.userId }).update({ ProfileId: req.body.profileId }).then(function (result) {
        var response = {
            resultCode: 1,
            resultMessage: 'Operação realizada com sucesso',
            data: result
        };
        res.json(response);
    });
};

var remove = exports.remove = function remove(req, res) {
    _database2.default.from('TB_USERS').where({ UserId: req.params.userId }).del().then(function (result) {
        var response = {
            resultCode: 1,
            resultMessage: 'Operação realizada com sucesso',
            data: result
        };
        res.json(response);
    });
};