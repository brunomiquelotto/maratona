var knex = require('knex');

var database = knex({
    client: 'sqlite3',
    connection: {
        filename: 'db.sqlite'
    },
    useNullAsDefault: true
});

module.exports = database;