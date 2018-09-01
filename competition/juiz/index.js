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
        root: '/competition/juiz/'
    });

    ko.bindingHandlers.module.baseDir = 'js';

    ko.router.map([
        { route: 'grupos', name: 'grupos', template: 'grupos', title: 'Grupos', nav: true, module: 'vm-grupos' }
    ]).mapNotFound({ callback: notFoundHandler });

    ko.applyBindings(viewModel);

    ko.router.init();
  
});