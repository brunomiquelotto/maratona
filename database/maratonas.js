var context = require('./database');

var list = function() {
    return context.select('*').from('TB_COMPETITIONS');
};

module.exports = { list: list };