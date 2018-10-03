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

var get = function(id) {
    return context.first('*').from('TB_QUESTIONS').where({ QuestionId: id });
};

var update = function(id, payload) {
    return context
        .table('TB_QUESTIONS')
        .where({ QuestionId: id })
        .update({ Letter: payload.letter, Description: payload.description, Color: payload.color });
};

var remove = function(id) {
    return context.table('TB_QUESTIONS').where({ QuestionId: id }).del();
};

module.exports = { list: list, create: create, get: get, update: update, remove: remove };