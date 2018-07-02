"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var login = exports.login = function login(req, res) {
    res.json({ login: true });
};

var validateToken = exports.validateToken = function validateToken(req, res) {
    res.json({ validate: true });
};