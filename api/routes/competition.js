import * as routes from '../controllers/competition';
import * as teamRoutes from '../controllers/team';
import * as teamQuestions from '../controllers/teamQuestions';

const route = app => {
    app.route('/competitions').get(routes.list).post(routes.create);
    app.route('/competitions/:id').get(routes.get).put(routes.update).delete(routes.remove);
    app.route('/competitions/:id/teams').get(teamRoutes.list).post(teamRoutes.create);
    app.route('/competitions/:id/teams/:teamId').get(teamRoutes.get).put(teamRoutes.update).delete(teamRoutes.remove);
    app.route('/competitions/:id/teams/:teamId/questions').get(teamQuestions.list).post(teamQuestions.create);
    return app;
};

export default route;
