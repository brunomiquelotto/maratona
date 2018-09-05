define(['knockout', 'axios'], function(ko, axios) {

    class ViewModel {

        constructor() {
            this.questions = ko.observableArray();
            this.deleteQuestion = this.deleteQuestion.bind(this);
            this.getQuestions = this.getQuestions.bind(this);
            this.getQuestions();
        }

        deleteQuestion(question) {
            console.log(question);
            axios.delete(window.location.origin + '/api/questions/' + question.QuestionId).then(response => {
               if(response.data.resultCode) {
                   this.getQuestions();
               }
            });
        }

        getQuestions() {
            axios.get(window.location.origin + '/api/questions').then(response => {
                if (response.data.resultCode){
                    this.questions(response.data.data);
                }
            })
            .catch(() => {
                alert('Erro ao consultar questões');
            });
        }
    }

    return new ViewModel;
});