import knex from 'knex';

const database = knex({
    client: 'sqlite3',
    connection: {
        filename: 'db.sqlite'
    }
});

export const start = () => {
    createDatabase();
};

const createDatabase = () => {
    console.log('Creating Tables');
    return database.schema
    .createTable('TB_PROFILES', table => {
        table.increments('ProfileId').primary();
        table.string('Description').notNullable();
    })
    .createTable('TB_USERS', table => {
        table.increments('UserId').primary();
        table.string('Name').notNullable();
        table.string('Password').notNullable();
        table.integer('ProfileId').references('ProfileId').inTable('TB_PROFILES').notNullable().onDelete('cascade');
    })
    .createTable('TB_COMPETITIONS', table => {
        table.increments('CompetitionId').primary();
        table.string('Name').notNullable();
        table.dateTime('DtStart').notNullable();
        table.integer('WrongTimePenalty').notNullable();
        table.integer('FreezeTime').notNullable();
        table.integer('CompetitionTime').notNullable();
    })
    .createTable('TB_TEAM', table => {
        table.increments('TeamId').primary();
        table.string('Name').notNullable();
        table.integer('CompetitionId').references('CompetitionId').inTable('TB_COMPETITIONS').notNullable().onDelete('cascade');
    })
    .createTable('TB_QUESTIONS', table => {
        table.increments('QuestionId').primary();
        table.string('Letter').notNullable();
        table.string('Description');
        table.string('Color');
    })
    .createTable('TB_TEAM_QUESTION', table => {
        table.increments('TeamQuestionId').primary();
        table.integer('TeamId').references('TeamId').inTable('TB_TEAMS').notNullable().onDelete('cascade');
        table.integer('QuestionId').references('QuestionId').inTable('TB_QUESTIONS').notNullable().onDelete('cascade');
        table.integer('Tries');
        table.boolean('IsRight');
        table.integer('PenaltyTime');
    })
    .createTable('TB_PARAMETERS', table => {
        table.increments('ParameterId').primary();
        table.string('Key').unique();
        table.string('Value');
    }).then(() => console.log('Tables created.'));
};

export default database;