define(['knockout', 'axios'], function(ko, axios) {

    class ViewModel {

        constructor() {

            this.question = {
                id: ko.observable(),
                letter: ko.observable(),
                description: ko.observable(),
                color: ko.observable(),
            };
        }

        saveQuestion() {

            let color = this.question.color();

            let payload = {
                id: this.question.id(),
                letter: this.question.letter(),
                description: this.question.description(),
                color: color,
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