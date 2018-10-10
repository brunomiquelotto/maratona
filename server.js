const express = require('express');
const bodyParser = require('body-parser');
const maratonRoutes = require('./routes/maratonas.js');
const questoesRoutes = require('./routes/questoes.js');
const competidoresRoutes = require('./routes/competidores.js');
const placarRoutes = require('./routes/placar.js');
const juizRoutes = require('./routes/juiz.js');

const app = express();

app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/admin', (req, res) => {
    res.render('admin/index.ejs');
});

maratonRoutes(app);
questoesRoutes(app);
competidoresRoutes(app);
placarRoutes(app);
juizRoutes(app);

app.listen(process.env.port || 5000, function() {
    console.log('Server is running');
});