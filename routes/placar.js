const { list, getCompetition } = require('../database/maratonas.js');
const { teams } = require('../database/placar.js');

module.exports = function(app, io) {
    app.get('/placar', (req, res) => {
        list().then((result) => {
            res.render('placar/maratonas.ejs', { maratonas: result });
        });
    });

    app.get('/placar/:id', (req, res) => {
        teams(req.params.id).then(result => {
            let allTeams = result.filter(getTeamsByResults).map(transformTeam);
            allTeams.forEach(team => {
                team.questions = result.filter(question => {
                    return question.TeamId == team.TeamId;
                }).map(transformQuestions).sort(sortQuestion);
            });
            let positions = allTeams.map(item => 'bg-default');
            positions = addPodiumColors(positions);
            getCompetition(req.params.id).then(competition => {
                res.render('placar/placar.ejs', { teams: allTeams.sort(sort), id: req.params.id, positions: positions, competition: competition });
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

const getTeamsByResults = (value, index, self) => {
    return self.findIndex(item => item.TeamId == value.TeamId) === index;
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