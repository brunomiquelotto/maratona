define(['knockout', 'knockout-router'], function(ko) {

    var self = this;

    var ViewModel = function(){
        var self = this;

        self.router = ko.router.vm;
        self.moduleToShow = ko.observable();

        self.name = "Filipe";
    };

    self.viewModel = new ViewModel;

    self.notify = function() {
        console.log(arguments, new Date());
    }

    self.notFoundHandler = function(fragment, query) {
        console.log(fragment, query);
    };

    ko.router.configure({
        hashPrefix: '#/',
        debug: true,
        notify: notify,
        pushState: true,
        root: 'competition/juiz/'
    });

    ko.bindingHandlers.module.baseDir = 'js';

    // Define the routes before ko.applyBindings() 
    ko.router.map([
        { route: 'grupos', name: 'grupos', template: 'grupos', title: 'Grupos', nav: true, module: 'vm-grupos' },
        // { route: 'competition/admin/', name: 'admin', template: 'home', title: 'Admin Title', nav: true },
        // { route: 'juiz', name: 'juiz', template: 'juiz', title: 'Juiz Title', nav: true },
        // { route: 'contact-us', name: 'contact', title: 'Contact Us', nav: true },
        // { route: 'content/news/:articleId', module: 'news' }
        //{ route: 'blog(/:slug)', name: 'blog', title: 'Crazy Blog' },
        //{ route: '*notfound', name: 'notfound', callback: notFoundHandler }
    ]).mapNotFound({ callback: notFoundHandler }); // can specify a module/template/callback/title

    ko.applyBindings(viewModel);

    ko.router.init();
  
});