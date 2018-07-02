'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configureOpenRoutes = exports.configureRoutes = undefined;

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureRoutes = exports.configureRoutes = function configureRoutes(router) {
    (0, _users2.default)(router);
};

var configureOpenRoutes = exports.configureOpenRoutes = function configureOpenRoutes(router) {
    (0, _login2.default)(router);
};