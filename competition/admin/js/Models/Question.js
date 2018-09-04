define(['knockout'], function(ko) {

    class Question {

        constructor(id = null) {
            this.id = ko.observable(id);
            this.letter = ko.observable('');
            this.description = ko.observable('');
            this.color = ko.observable(null);
        }

    }

    return Question;
});