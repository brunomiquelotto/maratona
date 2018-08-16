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
        filename: 'db.sqlite'
    }
});

var start = exports.start = function start() {
    createDatabase();
};

var createDatabase = function createDatabase() {
    console.log('Creating Tables');
    return database.schema.createTable('TB_PROFILES', function (table) {
        table.increments('ProfileId').primary();
        table.string('Description').notNullable();
    }).createTable('TB_USERS', function (table) {
        table.increments('UserId').primary();
        table.string('Name').notNullable();
        table.string('Password').notNullable();
        table.integer('ProfileId').references('ProfileId').inTable('TB_PROFILES').notNullable().onDelete('cascade');
    }).createTable('TB_COMPETITIONS', function (table) {
        table.increments('CompetitionId').primary();
        table.string('Name').notNullable();
        table.dateTime('DtStart').notNullable();
        table.integer('WrongTimePenalty').notNullable();
        table.integer('FreezeTime').notNullable();
        table.integer('CompetitionTime').notNullable();
    }).createTable('TB_TEAM', function (table) {
        table.increments('TeamId').primary();
        table.string('Name').notNullable();
        table.integer('CompetitionId').references('CompetitionId').inTable('TB_COMPETITIONS').notNullable().onDelete('cascade');
    }).createTable('TB_QUESTIONS', function (table) {
        table.increments('QuestionId').primary();
        table.string('Letter').notNullable();
        table.string('Description');
        table.string('Color');
    }).createTable('TB_TEAM_QUESTION', function (table) {
        table.increments('TeamQuestionId').primary();
        table.integer('TeamId').references('TeamId').inTable('TB_TEAMS').notNullable().onDelete('cascade');
        table.integer('QuestionId').references('QuestionId').inTable('TB_QUESTIONS').notNullable().onDelete('cascade');
        table.integer('Tries');
        table.boolean('IsRight');
        table.integer('PenaltyTime');
    }).createTable('TB_PARAMETERS', function (table) {
        table.increments('ParameterId').primary();
        table.string('Key').unique();
        table.string('Value');
    }).then(function () {
        return console.log('Tables created.');
    });
};

exports.default = database;