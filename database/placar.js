const context = require('./database');

const teams = function(competitionId) {
    return context.select('*').where({CompetitionId: competitionId}).from('PLACAR').orderBy('QuestionId', 'DESC');
};

module.exports = { teams: teams };