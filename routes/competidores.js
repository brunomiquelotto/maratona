const { list, create, remove, get, update } = require('../database/competidores.js');

module.exports = function(app) {
    app.get('/admin/maratonas/:id/competidores', (req, res) => {
        list(req.params.id).then(function(result) {
            res.render('admin/competidores/index.ejs', { times: result, id: req.params.id });
        });
    });

    app.get('/admin/maratonas/:id/competidores/novo', (req, res) => {
        res.render('admin/competidores/novo.ejs', { id: req.params.id });
    });

    app.post('/admin/maratonas/:id/competidores/novo', (req, res) => {
        var payload = req.body;
        payload.Id = req.params.id;
        create(payload)
            .then(() => {
                res.redirect('/admin/maratonas/' + req.params.id + '/competidores');
            })
            .catch(err => {
                res.render('admin/competidores/novo.ejs', { errors: err });
            });
    });

    app.get('/admin/maratonas/:id/competidores/:teamid/remove', (req, res) => {
        remove(req.params.id, req.params.teamid).then(() => {
            res.redirect('/admin/maratonas/' + req.params.id + '/competidores');
        });
    });

    app.get('/admin/maratonas/:id/competidores/:teamid', (req, res) => {
        get(req.params.id, req.params.teamid).then((result) => {
            res.render('admin/competidores/edit.ejs', { team: result, id: req.params.id });
        });
    });

    app.post('/admin/maratonas/:id/competidores/:teamid', (req, res) => {
        update(req.params.id, req.params.teamid, req.body).then(() => {
            res.redirect('/admin/maratonas/' + req.params.id + '/competidores');
        });
    });
}