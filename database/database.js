var knex = require('knex');

var database = knex({
    client: 'sqlite3',
    connection: {
        filename: 'db.sqlite'
    }
});

module.exports = database;