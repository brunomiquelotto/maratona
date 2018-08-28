ko.components.register('side-bar', {
    viewModel: function(params) {
        this.activeMenus = params.menus;
    },
    template:
            '<aside class="sidebar">\
                <ul class="sidebar-menus">\
                    <!-- ko foreach: activeMenus -->\
                    <li>\
                        <span data-bind="text: $data.text"></span>\
                        <span class="tip shadow" data-bind="text: $data.tooltip"></span>\
                    </li>\
                    <!-- /ko -->\
                </ul>\
            </aside>'
});