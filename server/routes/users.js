import UsersController from '../controllers/users';

const routes = app => {
  app.get('/api/v1/users', UsersController.getUsers);
  app.get('/api/v1/users/:id', UsersController.getUserById);
  app.post('/api/v1/users', UsersController.createUser);
  app.put('/api/v1/users/:id', UsersController.updateUser);
};

export default routes;
