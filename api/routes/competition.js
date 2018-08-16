import * as routes from '../controllers/competition';
import * as teamRoutes from '../controllers/team';

const route = app => {
    app.route('/competitions').get(routes.list).post(routes.create);
    app.route('/competitions/:id').get(routes.get).put(routes.update).delete(routes.remove);
    app.route('/competitions/:id/teams').get(teamRoutes.list).post(teamRoutes.create);
    app.route('/competitions/:id/teams/:teamId').get(teamRoutes.get).put(teamRoutes.update).delete(teamRoutes.remove)
    return app;
};

export default route;
