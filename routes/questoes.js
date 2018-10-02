const { list } = require('../database/questoes.js');

module.exports = function(app) {
    app.get('/admin/questoes', (req, res) => {
        list().then(function(result) {
            res.render('admin/questoes/index.ejs', { questoes: result });
        });
    });
}