import express from 'express';
//import verify from '../middlewares/verifyToken';
//import Authentication from '../middlewares/verifyToken';
import protect from '../middlewares/verifyToken';
import connection from '../helpers/conn';
import config from '../config/config';
const { secretKey } = config;

const db = connection();
db.connect();

const router = express.Router();

// router.get('/secrete', verify, (req, res) => {
//   res.json({
//     posts: {
//       title: 'my first post',
//       description: 'random data you should not access',
//     },
//   });
// });

router.get('/me', protect.auth, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE id=$1', [
      //req.user.user_id,
      req.user.user_id,
    ]);
    return res.status(200).json({ success: true, message: result.rows[0] });
  } catch (error) {
    return res.json(error);
  }
  //res.send(req.email);
  //res.json({ message: req.user });

  //   //  res.json({
  //   //   posts: {
  //   //     title: 'my first post',
  //   //     description: 'random data you should not access',
  //   //   },
  //   // });
});

export default router;
