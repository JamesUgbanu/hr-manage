import UsersController from '../controllers/users';

const routes = app => {
  app.get('/api/v1/users', UsersController.getUsers);
};

export default routes;
