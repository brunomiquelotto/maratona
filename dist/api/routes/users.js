'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _users = require('../controllers/users');

var routes = _interopRequireWildcard(_users);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var route = function route(app) {
    app.route('/users').get(routes.list).post(routes.create);
    app.route('/users/:userId').get(routes.get).put(routes.update).delete(routes.remove);
    return app;
};

exports.default = route;