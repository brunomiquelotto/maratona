;(() => {

    let retrieveOnlyURL = () => {
        return window.location.href.split('#')[0];
    };

    require.config({
        baseUrl: retrieveOnlyURL(),
        paths: {
            'knockout': '../script/lib/knockout-3.1.0.min',
            'knockout-amd-helpers': '../script/lib/knockout-amd-helpers-0.6.1',
            'knockout-history': '../script/dist/knockout-history',
            'knockout-router': '../script/dist/knockout-router',
            'text': '../script/lib/require-text-2.0.10',
            'axios': '../script/axios/axios.min',
        },
        shim: {
            'knockout-amd-helpers': {
                deps: ['knockout']
            },
            'knockout-history': {
                deps: ['knockout']
            },
            'knockout-router': {
                deps: ['knockout', 'knockout-history', 'knockout-amd-helpers']
            }
        }
    });

})();