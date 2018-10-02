var context = require('./database');

var list = function(id) {
    return context.select('*').from('TB_QUESTIONS').where({ CompetitionId: id });
};

var create = function(id, payload) {
    return context.table('TB_QUESTIONS')
    .insert({
        Letter: payload.letter,
        Description: payload.description,
        Color: payload.color,
        CompetitionId: id
    });
};

module.exports = { list: list, create: create };