define(['knockout', 'axios'], function(ko, axios) {

    class ViewModel {

        constructor() {

            this.questions = ko.observableArray();

            this.getQuestions();
        }

        getQuestions() {
            axios.get(window.location.origin + '/api/questions').then(function (response) {

                console.log(response);

                if (response.data.resultCode){
                    this.questions(response.data.data);
                }

            }.bind(this))
            .catch(function (error) {
                console.log(error);
                alert('Erro ao consultar questões');
            });
        }
    }

    return new ViewModel;
});