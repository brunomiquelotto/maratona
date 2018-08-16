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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
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

//start();

app.listen(port);

console.log('API is up and running on port ' + port);