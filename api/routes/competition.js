import * as routes from '../controllers/competition';

const route = app => {
    app.route('/competitions').get(routes.list).post(routes.create);
    app.route('/competitions/:id').get(routes.get).put(routes.update).delete(routes.remove);
    return app;
};

export default route;
