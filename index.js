import express from 'express';
import bodyParser from 'body-parser';
import { configureRoutes, configureOpenRoutes } from './api/routes';
import Auth from './api/middlewares/auth';
import allowCors from './api/middlewares/cors';
import { start } from './api/database';
import context from './api/database';

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
app.use('/competition', express.static('competition'));

//start();

http.listen(port);

console.log('API is up and running on port ' + port);

io.on('connection', (socket) => {
    console.log('User Connected');
    context.select('*').from('TB_COMPETITIONS').then(result => {
        result.forEach(item => {
            socket.emit('score-updated', item);
        });
    });
});