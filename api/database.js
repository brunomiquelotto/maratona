import knex from 'knex';

const database = knex({
    client: 'sqlite3',
    connection: {
        filename: '../db.sqlite'
    }
});

export const start = () => {
    createUserTable();
};

const createUserTable = () => {
    return database.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name');
    }).then(() => {});
};

export default database;