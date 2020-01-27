import checkNewLeaveRequest from '../validations/checkNewLeaveRequests';
import validation from '../middlewares/validator';
import LeaveController from '../controllers/leaverequests';

const LeaveRoutes = app => {
  app.get('/api/v1/leaverequests', LeaveController.getLeaveRequests);
  app.get('/api/v1/leaverequests/:id', LeaveController.getLeaveRequestsById);
  app.post(
    '/api/v1/leaverequests',
    checkNewLeaveRequest,
    validation.validatorError,
    LeaveController.createLeaveRequests
  );
  //app.put('/api/v1/leaverequests/:id', LeaveController.updateLeaveRequest);
  app.put('/api/v1/leaverequests/:id', LeaveController.updateLeaveStatus);
};

export default LeaveRoutes;
