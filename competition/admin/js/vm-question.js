define(['Question', 'knockout'], function(Question, ko) {

    class Color {

        constructor(id, color){
            this.id = id;
            this.value = color;
        }

    }

    class ViewModel {

        constructor() {

            this.listColor = ko.observableArray([
                new Color(1, 'red'),
                new Color(2, 'blue'),
                new Color(3, 'yellow'),
                new Color(4, 'green'),
            ]);

            this.question = new Question;

        }

        saveQuestion() {
            // tem que ter AJAX aqui
            console.log(this.question);
        }

    }

    return new ViewModel;
});