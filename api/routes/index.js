import users from './users';
import login from './login';

export const configureRoutes = router => {
    users(router);
};

export const configureOpenRoutes = router => {
    login(router);
};
