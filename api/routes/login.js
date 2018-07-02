import * as routes from '../controllers/login';

const route = app => {
    app.post('/login', routes.login);    
    app.post('/validateToken', routes.validateToken);
};

export default route;
