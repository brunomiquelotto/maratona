define(['knockout', 'knockout-router'], function(ko) {

    var self = this;

    var ViewModel = function(){
        var self = this;

        self.router = ko.router.vm;
        self.moduleToShow = ko.observable();
    };

    self.viewModel = new ViewModel;

    self.notify = function() {
        console.log(arguments, new Date());
    }

    self.notFoundHandler = function(fragment, query) {
        console.log(fragment, query);
    };

    ko.router.configure({
        hashPrefix: '#',
        debug: true,
        notify: notify,
        pushState: false,
        root: '/competition/admin/'
    });

    ko.bindingHandlers.module.baseDir = 'js';

    ko.router.map([
        {
            route: 'new-question', template: 'question', title: 'Cadastro Questão',
            nav: true,
            module: 'vm-question'
        },
        {
            route: 'edit-question/:id', template: 'question', title: 'Editar Questão',
            nav: true,
            module: 'vm-question'
        },
        {
            route: 'questions', template: 'question-list', title: 'Lista de Questões',
            nav: true,
            module: 'vm-question-list'
        },
    ]).mapNotFound({ callback: notFoundHandler });

    ko.applyBindings(viewModel);

    ko.router.init();
  
});