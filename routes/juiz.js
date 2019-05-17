const moment = require('moment');
const { list, teams, includeTry, getTeamQuestion, updateTry } = require('../database/juiz.js');
const { get: getCompetition } = require('../database/maratonas');

module.exports = function(app, io) {
    app.get('/juiz', (req, res) => {
        list().then(result => {
            res.render('juiz/index.ejs', { maratonas: result });
        });
    });

    app.get('/juiz/:id', (req, res) => {
        teams(req.params.id).then(result => {
            let allTeams = result.filter(getTeamsByResults).map(transformTeam);
            allTeams.forEach(team => {
                team.questions = result.filter(question => {
                    return question.TeamId == team.TeamId;
                }).map(transformQuestions).sort(sortQuestion);
            });
            let score = allTeams.slice().sort(sort);
            let allQuestions = allTeams[0].questions.map(transformQuestions).sort(sortQuestion);
            let positions = allTeams.map(item => 'bg-default');
            getCompetition(req.params.id).then(competition => {
            let competitionTime = moment().diff(moment(competition.DtStart, 'DD/MM/YYYY HH:mm:ss'), 'minutes');
                positions = addPodiumColors(positions);
                res.render('juiz/maratona.ejs', { teams: allTeams, questions: allQuestions, positions, score, competitionTime });
            });
        });
    });

    app.post('/juiz/:id', (req, res) => {
        getCompetition(req.params.id).then(competition => {
            getTeamQuestion(req.body.QuestionId, req.body.TeamId).then(teamQuestion => {
                handleSaveQuestion(competition, req.body, teamQuestion).then(() => {
                    teams(req.params.id).then(result => {
                        let allTeams = result.filter(getTeamsByResults).map(transformTeam);
                        allTeams.forEach(team => {
                            team.questions = result.filter(question => {
                                return question.TeamId == team.TeamId;
                            }).map(transformQuestions).sort(sortQuestion);
                        });
                        let positions = allTeams.map(item => 'bg-default');
                        positions = addPodiumColors(positions);
                        if (competition)
                        io.emit('update_score', { items: allTeams.sort(sort) });
                    });
                    return res.redirect('/juiz/' + req.params.id);
                });
            });
        });
    });
};

const addPodiumColors = positions => {
    if (!positions.length) return positions;

    positions[0] = 'bg-gold';

    if (positions.length < 2) return positions;
    positions[1] = 'bg-silver';

    if (positions.length < 3) return positions;
    positions[2] = 'bg-bronze';
    
    return positions;
};

const handleSaveQuestion = function(competition, payload, teamQuestion) {
    if (!teamQuestion) {
        return includeTry(payload, competition);
    }
    return updateTry(teamQuestion, payload, competition);
};

const transformTeam = team => {
    return {
        TeamId: team.TeamId,
        Name: team.Name
    };
};

const transformQuestions = question => {
    return {
        QuestionId: question.QuestionId,
        Color: question.Color,
        Tries: question.Tries,
        IsRight: question.IsRight,
        TotalTime: question.TotalTime,
        Letter: question.Letter,
        PenaltyTime: question.PenaltyTime
    };
};

const sortQuestion = (a, b) => {
    return a.Letter > b.Letter ? 1 : -1;
};

const getTeamsByResults = (value, index, self) => {
    return self.findIndex(item => item.TeamId == value.TeamId) === index;
};

const sort = (a, b) => {
    let aSuccesses = a.questions.filter(question => question.IsRight).length;
    let bSuccesses = b.questions.filter(question => question.IsRight).length;
    
    if (bSuccesses != aSuccesses) {
        return bSuccesses - aSuccesses;
    }
    
    if (aSuccesses == 0) {
        return 0;
    }

    let aPenaltyTime = a.questions
        .filter(question => question.IsRight)
        .reduce((accumulator, current) => accumulator + (current.PenaltyTime ? current.PenaltyTime : 0), 0);
    let bPenaltyTime = b.questions
        .filter(question => question.IsRight)
        .reduce((accumulator, current) => accumulator + (current.PenaltyTime ? current.PenaltyTime : 0), 0);

    return  aPenaltyTime - bPenaltyTime;
};