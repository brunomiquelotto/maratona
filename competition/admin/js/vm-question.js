define(['Question', 'knockout', 'axios'], function(Question, ko, axios) {

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

            let color = this.question.color();

            let payload = {
                id: this.question.id(),
                letter: this.question.letter(),
                description: this.question.description(),
                color: color ? color.value : null,
            };

            axios.post(window.location.origin + '/api/questions', payload).then(function (response) {

                console.log(response);

                if (response.data.resultCode){
                    alert('Questão cadastrada com sucesso');
                    return;
                }

                alert('Erro ao cadastrar questão');
            })
            .catch(function (error) {
                console.log(error);
                alert('Erro ao cadastrar questão');
            });
        }
    }

    return new ViewModel;
});