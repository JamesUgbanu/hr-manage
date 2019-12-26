import UsersController from '../controllers/users';

const routes = app => {
  app.get('/api/v1/users', UsersController.getUsers);
  app.get('/api/v1/users/:id', UsersController.getUserById);
  app.post('/api/v1/createUser', UsersController.createUser);
};

export default routes;
