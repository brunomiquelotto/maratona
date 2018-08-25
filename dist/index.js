'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./api/routes');

var _auth = require('./api/middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

var _cors = require('./api/middlewares/cors');

var _cors2 = _interopRequireDefault(_cors);

var _database = require('./api/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

var protectedApi = _express2.default.Router();
protectedApi.use(_auth2.default);
(0, _routes.configureRoutes)(protectedApi);

var openApi = _express2.default.Router();
(0, _routes.configureOpenRoutes)(openApi);

app.use(_cors2.default);
app.use('/api', protectedApi);
app.use('/oapi', openApi);
app.use('/admin', _express2.default.static('admin'));

//start();

http.listen(port);

console.log('API is up and running on port ' + port);

io.on('connection', function (socket) {
    console.log('User Connected');
    _database2.default.select('TB_QUESTIONS.QuestionId', 'TB_QUESTIONS.Letter', 'TB_QUESTIONS.Description', 'TB_QUESTIONS.Color', 'TB_TEAM_QUESTION.Tries', 'TB_TEAM_QUESTION.IsRight', 'TB_TEAM_QUESTION.PenaltyTime').from('TB_TEAM_QUESTION').innerJoin('TB_QUESTIONS', 'TB_TEAM_QUESTION.QuestionId', 'TB_QUESTIONS.QuestionId').then(function (result) {
        result.forEach(function (item) {
            socket.emit('score-updated', result);
        });
    });
});

global.io = io;