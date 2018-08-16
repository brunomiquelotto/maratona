import context from '../database';

export const list = (req, res) => {
    context.select('UserId', 'Name', 'ProfileId').from('TB_USERS').then(result => {
        let response = {
            resultCode: 1,
            resultMessage: 'Operação realizada com sucesso',
            data: result
        };
        res.json(response);
    });
};

export const get = (req, res) => {
    context.first('UserId', 'Name', 'ProfileId').from('TB_USERS').where({UserId: req.params.userId})
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
    context.table('TB_USERS').insert({ Name: req.body.name, Password: req.body.password, ProfileId: req.body.profileId }).then(result => {
        let response = {
            resultCode: 1,
            resultMessage: 'Operação realizada com sucesso'
        }
        res.json(response);
    });
};

export const update = (req, res) => {
    context
        .from('TB_USERS')
        .where({UserId: req.params.userId})
        .update({ ProfileId: req.body.profileId })
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
        .from('TB_USERS')
        .where({UserId: req.params.userId})
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
