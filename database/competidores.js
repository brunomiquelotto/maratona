var context = require('./database');

var list = function(id) {
    return context.select('*').where({ CompetitionId: id }).from('TB_TEAM');
};

module.exports = { list: list };