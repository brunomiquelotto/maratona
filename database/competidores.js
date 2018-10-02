var context = require('./database');

var list = function(id) {
    return context.select('*').where({ CompetitionId: id }).from('TB_TEAM');
};

var create = function (payload) {
    return context.table('TB_TEAM').insert({ Name: payload.Name, CompetitionId: payload.Id });
};

var remove = function(competitionId, teamId) {
    return context.from('TB_TEAM').where({ CompetitionId: competitionId, TeamId: teamId }).del();
};

var get = function(competitionId, teamId) {
    return context.first('*').from('TB_TEAM').where({ TeamId: teamId, CompetitionId: competitionId });
};

var update = function (competitionId, teamId, payload) {
    return context.from('TB_TEAM').where({ CompetitionId: competitionId, TeamId: teamId })
        .update({ Name: payload.Name });
};

module.exports = { list: list, create: create, remove: remove, get: get, update: update };