var ViewModel = function() {
    var self = this;
    self.score = ko.observableArray([]);
    var socket = io();
    socket.on('score-updated', function(update) {
        console.log(update);
        self.score.push(update);
    })
};