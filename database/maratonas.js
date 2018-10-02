var context = require('./database');

var list = function() {
    return context.select('*').from('TB_COMPETITIONS');
};

var remove = function(id) {
    return context.from('TB_COMPETITIONS').where({ CompetitionId: id }).del()
};

var create = function(payload) {
    return context.table('TB_COMPETITIONS')
    .insert({
        Name: payload.name,
        DtStart: payload.dtStart,
        WrongTimePenalty: payload.wrongTimePenalty,
        FreezeTime: payload.freezeTime,
        CompetitionTime: payload.competitionTime,
    });
};

var get = function(id) {
    return context.first('*').from('TB_COMPETITIONS').where({CompetitionId: id});
};

var update = function(id, payload) {
    return context.from('TB_COMPETITIONS')
    .where({CompetitionId: id})
    .update({
        Name: payload.name,
        DtStart: payload.dtStart,
        WrongTimePenalty: payload.wrongTimePenalty,
        FreezeTime: payload.freezeTime,
        CompetitionTime: payload.competitionTime,
    });
};

module.exports = { list: list, remove: remove, create: create, get: get, update: update };