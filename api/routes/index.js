import users from './users';
import login from './login';
import questions from './questions';
import competitions from './competition';

export const configureRoutes = router => {
    users(router);
    questions(router);
    competitions(router);
};

export const configureOpenRoutes = router => {
    login(router);
};
