'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configureOpenRoutes = exports.configureRoutes = undefined;

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

var _questions = require('./questions');

var _questions2 = _interopRequireDefault(_questions);

var _competition = require('./competition');

var _competition2 = _interopRequireDefault(_competition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureRoutes = exports.configureRoutes = function configureRoutes(router) {
    (0, _users2.default)(router);
    (0, _questions2.default)(router);
    (0, _competition2.default)(router);
};

var configureOpenRoutes = exports.configureOpenRoutes = function configureOpenRoutes(router) {
    (0, _login2.default)(router);
};