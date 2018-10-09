const moment = require('moment');
const context = require('./database');

const list = function() {
    return context.from('TB_COMPETITIONS').select('*').orderBy('DtStart', 'DESC');
};

const teams = function(competitionId) {
    return context.from('PLACAR').select('*').where({CompetitionId: competitionId});
};

const includeTry = function(payload, competition) {
    var penaltyTime = moment().diff(moment(competition.DtStart, 'DD/MM/YYYY HH:mm:ss'), 'minutes') || 1;
    if (payload.IsRight == '0') {
        penaltyTime = competition.WrongTimePenalty;
    }
    var values = {
        TeamId: payload.TeamId,
        QuestionId: payload.QuestionId,
        IsRight: payload.IsRight,
        PenaltyTime: penaltyTime,
        Tries: 1
    };
    return context.table('TB_TEAM_QUESTION').insert(values);
};

const getTeamQuestion = function(questionId, teamId) {
    return context.from('TB_TEAM_QUESTION').first('*').where({QuestionId: questionId, TeamId: teamId});
};

const updateTry = function(teamQuestion, payload, competition) {
    if (teamQuestion.IsRight) {
        return Promise.resolve();
    }
    var penaltyTime = teamQuestion.PenaltyTime;
    if (payload.IsRight == '1') {
        penaltyTime += moment().diff(moment(competition.DtStart, 'DD/MM/YYYY HH:mm:ss'), 'minutes');
    } else {
        console.log(competition);
        penaltyTime += competition.WrongTimePenalty;
    }
    var values = {
        IsRight: payload.IsRight,
        PenaltyTime: penaltyTime,
        Tries: teamQuestion.Tries + 1
    };
    return context.table('TB_TEAM_QUESTION').where({TeamQuestionId: teamQuestion.TeamQuestionId })
        .update(values);
};

module.exports = { list: list, teams: teams, includeTry: includeTry, getTeamQuestion: getTeamQuestion, updateTry: updateTry };