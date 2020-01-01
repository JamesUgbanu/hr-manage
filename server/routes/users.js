import UsersController from '../controllers/users';
//import LeaveController from '../controllers/leaverequests';

const routes = app => {
  app.get('/api/v1/users', UsersController.getUsers);
  app.get('/api/v1/users/:id', UsersController.getUserById);
  app.post('/api/v1/users', UsersController.createUser);
  app.put('/api/v1/users/:id', UsersController.updateUser);
  app.delete('/api/v1/users/:id', UsersController.deleteUser);
  // app.post('/api/v1/leaverequests', LeaveController.createLeaveRequests);
};

export default routes;
