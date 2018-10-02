const { list } = require('../database/maratonas.js');

module.exports = function(app) {
    app.get('/admin/maratonas', (req, res) => {
        list().then(result => {
            res.render('admin/maratonas/index.ejs', { maratonas : result });
        });
    });
    
    app.get('/admin/nova-maratona', (req, res) => {
        res.render('/admin/maratonas/nova.ejs');
    });

    app.post('/admin/nova-maratona', (req, res) => {
        
    });
};