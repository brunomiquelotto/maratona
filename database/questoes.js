var context = require('./database');

var list = function() {
    return context.select('QuestionId', 'Letter', 'Description', 'Color').from('TB_QUESTIONS');
};

module.exports = { list: list };