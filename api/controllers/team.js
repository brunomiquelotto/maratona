import context from '../database';

export const list = (req, res) => {
    context
        .select('*')
        .where({ CompetitionId: req.params.id })
        .from('TB_TEAM')
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
        .from('TB_TEAM')
        .where({ TeamId: req.params.teamId, CompetitionId: req.params.id })
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
        .table('TB_TEAM')
        .insert({
            Name: req.body.name,
            CompetitionId: req.params.id
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
        .from('TB_TEAM')
        .where({ CompetitionId: req.params.id, TeamId: req.params.teamId })
        .update({
            Name: req.body.name
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
        .from('TB_TEAM')
        .where({ CompetitionId: req.params.id, TeamId: req.params.teamId })
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
