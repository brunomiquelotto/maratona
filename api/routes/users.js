import * as routes from '../controllers/users';

const route = app => {
    app.route('/users').get(routes.list).post(routes.create);
    app.route('/users/:userId').get(routes.get).put(routes.update).delete(routes.remove);
    return app;
};

export default route;
