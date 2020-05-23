import express from 'express';
//import verify from '../middlewares/verifyToken';
//import Authentication from '../middlewares/verifyToken';
import protect from '../middlewares/verifyToken';
import UserController from '../controllers/users';
//import { verify } from 'jsonwebtoken';

const router = express.Router();

router.post('/register', UserController.signUp);
router.post('/login', UserController.login);

router.get(
  '/getallusers',
  protect.auth,
  protect.authorize,
  UserController.getUsers
);
router.get('/getcurrentuser', protect.auth, UserController.getCurrentUser);
// router.delete(
//   '/deleteById/:id',
//   protect.auth,
//   protect.authorize,
//   UserController.deleteUser
// );

//router.post('/login/admin', verify, UserController.login);
router.get('/getuser/:id', protect.auth, UserController.getUserById);

// router.patch(
//   '/updateuser/:id',
//   protect.auth,
//   protect.authorize,
//   UserController.update
// );

export default router;
