import * as routes from '../controllers/questions';

const route = app => {
    app.route('/questions').get(routes.list).post(routes.create);
    app.route('/questions/:id').get(routes.get).put(routes.update).delete(routes.remove);
    return app;
};

export default route;
