import UsersController from '../controllers/users';

const routes = app => {
  app.get('/api/v1/users', UsersController.getUsers);
  app.get('/api/v1/users/:id', UsersController.getUserById);
};

export default routes;
