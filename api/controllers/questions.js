import context from '../database';

export const list = (req, res) => {
    context
        .select('QuestionId', 'Letter', 'Description', 'Color')
        .from('TB_QUESTIONS')
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
        .first('QuestionId', 'Letter', 'Description', 'Color')
        .from('TB_QUESTIONS')
        .where({QuestionId: req.params.id})
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
        .table('TB_QUESTIONS')
        .insert({
            Letter: req.body.letter,
            Description: req.body.description,
            Color: req.body.color
        })
        .then(result => {
            let response = {
                resultCode: 1,
                resultMessage: 'Operação realizada com sucesso',
                data: {
                    QuestionId: result[0]
                }
            }
            res.json(response);
        });
};

export const update = (req, res) => {
    context
        .from('TB_QUESTIONS')
        .where({QuestionId: req.params.id})
        .update({
            Letter: req.body.letter,
            Description: req.body.description,
            Color: req.body.color
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
        .from('TB_QUESTIONS')
        .where({ QuestionId: req.params.id })
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
