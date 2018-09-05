define(['knockout', 'axios'], function(ko, axios) {

    class ViewModel {

        constructor() {
            this.competitions = ko.observableArray();
            this.getCompetitions = this.getCompetitions.bind(this);
            this.getCompetitions();
        }

        getCompetitions() {
            axios.get(window.location.origin + '/api/competitions').then(response => {
                if (response.data.resultCode){
                    this.competitions(response.data.data);
                }
            })
            .catch(() => {
                alert('Erro ao consultar competições');
            });
        }
    }

    return new ViewModel;
});