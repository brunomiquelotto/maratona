'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.start = undefined;

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var database = (0, _knex2.default)({
    client: 'sqlite3',
    connection: {
        filename: '../db.sqlite'
    }
});

var start = exports.start = function start() {
    createUserTable();
};

var createUserTable = function createUserTable() {
    return database.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('name');
    }).then(function () {});
};

exports.default = database;