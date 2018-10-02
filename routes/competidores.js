const { list } = require('../database/competidores.js');

module.exports = function(app) {
    app.get('/admin/maratonas/:id/competidores', (req, res) => {
        list(req.params.id).then(function(result) {
            res.render('admin/competidores/index.ejs', { times: result });
        });
    });
}