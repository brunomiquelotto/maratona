import context from '../database';

export const list = (req, res) => {
    context
        .select(
            'TB_QUESTIONS.QuestionId',
            'TB_QUESTIONS.Letter',
            'TB_QUESTIONS.Description',
            'TB_QUESTIONS.Color',
            'TB_TEAM_QUESTION.Tries',
            'TB_TEAM_QUESTION.IsRight',
            'TB_TEAM_QUESTION.PenaltyTime',
        )
        .from('TB_TEAM_QUESTION')
        .innerJoin('TB_QUESTIONS', 'TB_TEAM_QUESTION.QuestionId', 'TB_QUESTIONS.QuestionId')
        .then(result => {
            let response = {
                resultCode: 1,
                resultMessage: 'Operação realizada com sucesso',
                data: result
            };
            res.json(response);
        });
};

export const create = (req, res) => {
    context
        .table('TB_TEAM_QUESTION')
        .first('*')
        .where({ QuestionId: req.body.questionId, TeamId: req.params.teamId })
        .then(result => {
            if (result) {
                update(result, res, req);
            } else {
                insert(res, req);
            }
        })
};

const update = (result, res, req) => {
        context    
        .table('TB_TEAM_QUESTION')
        .where({ TeamQuestionId: result.TeamQuestionId })
        .update({
            Tries: result.Tries + 1,
            IsRight: req.body.isRight,
            PenaltyTime: req.body.isRight ? req.body.penaltyTime : 0
        })
        .then(result => {
            res.json({
                resultCode: 1,
                resultMessage: 'Operação realizada com sucesso',
                data: result 
            });
            // TODO: disparar broadcast;
        });
};

const insert = (res, req) => {
    context
        .table('TB_TEAM_QUESTION')
        .insert({
            TeamId: req.params.teamId,
            QuestionId: req.body.questionId,
            Tries: 1,
            IsRight: req.body.isRight,
            PenaltyTime: req.body.isRight ? req.body.penaltyTime : 0
        })
        .then(result => {
            res.json({
                resultCode: 1,
                resultMessage: 'Operação realizada com sucesso',
                data: result 
            });
            // TODO: disparar broadcast;
        });
}
