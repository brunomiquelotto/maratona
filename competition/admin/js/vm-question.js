define(['knockout', 'axios'], function(ko, axios) {

    class ViewModel {

        constructor() {
            this.question = {
                id: ko.observable(),
                letter: ko.observable(),
                description: ko.observable(),
                color: ko.observable('#000000'),
            };
        }

        saveQuestion() {

            let payload = {
                id: this.question.id(),
                letter: this.question.letter(),
                description: this.question.description(),
                color: this.question.color()
            };

            axios.post(window.location.origin + '/api/questions', payload).then(response => {
                if (response.data.resultCode){
                    alert('Questão cadastrada com sucesso');
                    return;
                }
                alert('Erro ao cadastrar questão');
            })
            .catch(() => { alert('Erro ao cadastrar questão'); });
        }
    }

    return new ViewModel;
});