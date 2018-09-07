define(['knockout', 'axios'], function(ko, axios) {

    var ViewModel = function() {
        var self = this;
        
        self.params = ko.router.vm.activeRoute().data;
        self.marathon = ko.observable(new Marathon());

        self.saveMarathon = function() {

            var payload = ko.toJS(self.marathon);

            axios.post(window.location.origin + '/api/competitions', payload).then(response => {
                if (response.data.resultCode){
                    alert('Maratona cadastrada com sucesso');
                    self.marathon(new Marathon());
                    return;
                }
                alert('Erro ao cadastrar maratona');
            })
            .catch(() => { alert('Erro ao cadastrar maratona'); });
        }
    };

    var Marathon = function(marathon) {
        marathon = marathon || {};
        this.name = ko.observable(marathon.name);
        this.dtStart = ko.observable(marathon.dtStart);
        this.wrongTimePenalty = ko.observable(marathon.wrongTimePenalty);
        this.freezeTime = ko.observable(marathon.freezeTime);
        this.competitionTime = ko.observable(marathon.competitionTime);
    };

    return new ViewModel;
});