const { list, create, get, update, remove } = require('../database/questoes.js');

module.exports = function(app) {
    app.get('/admin/maratonas/:id/questoes', (req, res) => {
        list(req.params.id).then(function(result) {
            res.render('admin/questoes/index.ejs', { questoes: result, id: req.params.id });
        });
    });

    app.get('/admin/maratonas/:id/questoes/nova', (req, res) => {
        res.render('admin/questoes/nova.ejs', { id: req.params.id });
    });

    app.post('/admin/maratonas/:id/questoes/nova', (req, res) => {
        create(req.params.id, req.body).then(() => {
            res.redirect('/admin/maratonas/' + req.params.id + '/questoes');
        })
    });

    app.get('/admin/maratonas/:id/questoes/:qid/remove', (req, res) => {
        remove(req.params.qid).then(() => {
            res.redirect('/admin/maratonas/' + req.params.id + '/questoes');
        })
    });

    app.get('/admin/maratonas/:id/questoes/:qid', (req, res) => {
        get(req.params.qid).then((result) => {
            res.render('admin/questoes/edit.ejs', { questao: result, id: req.params.id });
        });
    });

    app.post('/admin/maratonas/:id/questoes/:qid', (req, res) => {
        update(req.params.qid, req.body).then(() => {
            res.redirect('/admin/maratonas/' + req.params.id + '/questoes');
        });
    });
}