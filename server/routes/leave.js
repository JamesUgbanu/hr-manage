import express from 'express';
//import verify from '../middlewares/verifyToken';
import protect from '../middlewares/verifyToken';
import LeaveController from '../controllers/leave';

const router = express.Router();

router.post('/leaverequests', LeaveController.createLeave);
router.get('/getleaverequests', protect.auth, LeaveController.getLeaveRequests);
router.get('/getleaverequests/:id', LeaveController.getLeaveById);
// router.patch(
//   '/updateleavestatus/:id',
//   verify,
//   LeaveController.updateLeaveStatus
// );

export default router;
