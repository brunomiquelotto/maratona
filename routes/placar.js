const { list } = require('../database/maratonas.js');

module.exports = function(app) {
    app.get('/placar', (req, res) => {
        list().then((result) => {
            res.render('placar/maratonas.ejs', { maratonas: result });
        });
    });

    app.get('/placar/:id', (req, res) => {
        res.render('placar/placar.ejs');
    })
};