import express from 'express';
import bodyParser from 'body-parser';
import { configureRoutes, configureOpenRoutes } from './api/routes';
import Auth from './api/middlewares/auth';
import allowCors from './api/middlewares/cors';

const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const protectedApi = express.Router();
protectedApi.use(Auth)
configureRoutes(protectedApi);

const openApi = express.Router();
configureOpenRoutes(openApi);

app.use(allowCors);
app.use('/api', protectedApi);
app.use('/oapi', openApi);
var redirect = function(route) {
    return function(req, res, next) {
        console.log(req.params.id);
        if (req.params.id.indexOf('js') == -1
            && req.params.id.indexOf('css') == -1
            && req.params.id.indexOf('templates') == -1) {
            res.redirect(route);
        } else {
            next();
        }
    };
};
app.use('/competition/juiz/:id/', redirect('/competition/juiz'));
app.use('/competition/placar/:id/', redirect('/competition/placar'));
app.use('/competition/admin/:id/', redirect('/competition/admin'));
app.use('/competition', express.static('competition'));

http.listen(port);

console.log('API is up and running on port ' + port);

global.io = io;