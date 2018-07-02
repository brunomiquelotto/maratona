'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var users = [{ userId: 1, name: 'Bruno' }, { userId: 2, name: 'Bruno 2' }, { userId: 3, name: 'Bruno 3' }, { userId: 4, name: 'Bruno 4' }];

var list = exports.list = function list(req, res) {
    res.json(users);
};

var get = exports.get = function get(req, res) {
    res.json(users.find(function (u) {
        return u.userId == req.params.userId;
    }));
};

var create = exports.create = function create(req, res) {
    users = [].concat(_toConsumableArray(users), [req.body]);
    res.json(req.body);
};

var update = exports.update = function update(req, res) {
    user = users.find(function (u) {
        return u.userId == req.params.userId;
    });
    users = users.filter(function (u) {
        return u.userId != req.params.userId;
    });
    user = [].concat(_toConsumableArray(users), [user]);
    res.json(req.body);
};

var remove = exports.remove = function remove(req, res) {
    users = users.filter(function (u) {
        return userId != req.params.userId;
    });
};