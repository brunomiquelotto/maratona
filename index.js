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
app.use('/admin', express.static('admin'));

//start();

http.listen(port);

console.log('API is up and running on port ' + port);

io.on('connection', (socket) => {
    console.log('User Connected');
    context
    .select(
        'TB_QUESTIONS.QuestionId',
        'TB_QUESTIONS.Letter',
        'TB_QUESTIONS.Description',
        'TB_QUESTIONS.Color',
        'TB_TEAM_QUESTION.Tries',
        'TB_TEAM_QUESTION.IsRight',
        'TB_TEAM_QUESTION.PenaltyTime',
    )
    .from('TB_TEAM_QUESTION')
    .innerJoin('TB_QUESTIONS', 'TB_TEAM_QUESTION.QuestionId', 'TB_QUESTIONS.QuestionId')
    .then(result => {
        result.forEach(item => {
            socket.emit('score-updated', result)
        })
    });
});

global.io = io;