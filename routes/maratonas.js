const moment = require('moment');
const { list, remove, create, get, update, start } = require('../database/maratonas.js');

module.exports = function(app) {
    app.get('/admin/maratonas', (req, res) => {
        list().then(result => {
            res.render('admin/maratonas/index.ejs', { maratonas : result });
        });
    });
    
    app.post('/admin/maratonas/nova', (req, res) => {
        create(req.body).then(() => {
            res.redirect('/admin/maratonas');
        });
    });

    app.get('/admin/maratonas/nova', (req, res) => {
        res.render('admin/maratonas/nova.ejs');
    });

    app.get('/admin/maratonas/:id/remove', (req, res) => {
        remove(req.params.id).then(() => {
            res.redirect('/admin/maratonas');
        })
    });

    app.get('/admin/maratonas/:id', (req, res) => {
        get(req.params.id).then((result) => {
            res.render('admin/maratonas/edit.ejs', { maratona: result });
        });
    });

    app.post('/admin/maratonas/:id', (req, res) => {
        update(req.params.id, req.body).then(() => {
            res.redirect('/admin/maratonas');
        });
    });

    app.get('/admin/maratonas/:id/iniciar', (req, res) => {
        start(req.params.id, moment().format('DD/MM/YYYY HH:MM')).then(() => {
            res.redirect('/admin/maratonas');
        });
    });
};