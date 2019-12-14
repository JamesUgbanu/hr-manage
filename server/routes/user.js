import UsersController from '../controller/usersController';


const routes = (app) => {
  app.post('/api/v1/auth/addUser', UsersController.addUser);
};

export default routes;
