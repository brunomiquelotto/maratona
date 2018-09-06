define(['knockout', 'axios'], function(ko, axios) {

    class ViewModel {

        constructor() {
            this.params = ko.router.vm.activeRoute().data;

            this.question = {
                id: ko.observable(this.params.id || null),
                letter: ko.observable(),
                description: ko.observable(),
                color: ko.observable('#000000'),
            };

            this.searchQuestion();
        }

        searchQuestion(){
            if (!this.question.id()){
                return;
            }

            axios.get(window.location.origin + '/api/questions/' + this.question.id()).then(response => {
                if (response.data.resultCode){
                    // terminar
                }
            })
            .catch(() => {
                alert('Erro ao consultar questões');
            });
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