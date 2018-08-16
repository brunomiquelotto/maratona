import context from '../database';

export const list = (req, res) => {
    context
        .select('*')
        .from('TB_COMPETITIONS')
        .then(result => {
            let response = {
                resultCode: 1,
                resultMessage: 'Operação realizada com sucesso',
                data: result
            };
            res.json(response);
        });
};

export const get = (req, res) => {
    context
        .first('*')
        .from('TB_COMPETITIONS')
        .where({CompetitionId: req.params.id})
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
        .table('TB_COMPETITIONS')
        .insert({
            Name: req.body.name,
            DtStart: req.body.dtStart,
            WrongTimePenalty: req.body.wrongTimePenalty,
            WrongTimePenalty: req.body.wrongTimePenalty,
            FreezeTime: req.body.freezeTime,
            CompetitionTime: req.body.competitionTime,
        })
        .then(result => {
            let response = {
                resultCode: 1,
                resultMessage: 'Operação realizada com sucesso'
            }
            res.json(response);
        });
};

export const update = (req, res) => {
    context
        .from('TB_COMPETITIONS')
        .where({CompetitionId: req.params.id})
        .update({
            Name: req.body.name,
            DtStart: req.body.dtStart,
            WrongTimePenalty: req.body.wrongTimePenalty,
            WrongTimePenalty: req.body.wrongTimePenalty,
            FreezeTime: req.body.freezeTime,
            CompetitionTime: req.body.competitionTime,
        })
        .then(result => {
            let response = {
                resultCode: 1,
                resultMessage: 'Operação realizada com sucesso',
                data: result
            };
            res.json(response);
        });
};

export const remove = (req, res) => {
    context
        .from('TB_COMPETITIONS')
        .where({ CompetitionId: req.params.id })
        .del()
        .then(result => {
            let response = {
                resultCode: 1,
                resultMessage: 'Operação realizada com sucesso',
                data: result
            };
            res.json(response);
        });
};
