import jwt from 'jsonwebtoken';
import config from '../config/config';
import connection from '../helpers/conn';
const { secretKey } = config;

const db = connection();
db.connect();

const auth = async (req, res, next) => {
  const token = req.header('auth-token');
  //const token = req.header('auth-token').split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Denied' });
  // return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, secretKey);

    //req.user = verified;

    //console.log(req.user.is_admin);
    const { rows } = await db.query('SELECT * FROM users WHERE id=$1', [
      verified.user_id,
    ]);
    if (!rows[0]) return res.status(401).json({ message: 'Invalid Token' });
    //req.user = result.rows[0];
    req.user = verified;
    //console.log(req.user);
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
    // res.status(400).send('Invalid Token');
  }
};
//export default auth;
const authorize = async (req, res, next) => {
  const token = req.header('auth-token');
  //if (!token) return res.status(401).json({ message: 'Access Denied' });
  try {
    const verified = jwt.verify(token, secretKey);
    //console.log(verified.is_admin);
    req.user = verified;

    if (!req.user.is_admin) {
      return res.status(401).json({ message: 'Access Denied' });
    }

    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

const jwtAuth = {
  auth: auth,
  authorize: authorize,
};

export default jwtAuth;

/* const Authentication = {
  async auth(req, res, next) {
    const token = req.header('auth-token');
    console.log(token);
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
      const verified = jwt.verify(token, secretKey);
      req.user = verified;
      //console.log(req.user);

      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid Token' });
    }
  },

  // async verifyAdmin(req, res, next) {
  //   const token = req.header('auth-token');
  //   //if (!token) return res.status(401).json({ message: 'Access Denied' });
  //   try {
  //     const verified = jwt.verify(token, secretKey);
  //     //console.log(verified.is_admin);
  //     req.admin = verified;
  //     console.log(req.admin.is_admin);

  //     if (!req.admin.is_admin) {
  //       return res.status(401).json({ message: 'Access Denied' });
  //     }

  //     next();
  //   } catch (err) {
  //     res.status(400).json({ message: 'Invalid Token' });
  //   }
  // },

  // async verifyCurrentUser(req, res, next) {
  //   const token = req.header('auth-token');
  //   //if (!token) return res.status(401).json({ message: 'Access Denied' });
  //   try {
  //     const verified = jwt.verify(token, secretKey);
  //     //console.log(verified.is_admin);
  //     req.currentUser = verified;
  //     // console.log(req.currentUser.email);

  //     if (!req.currentUser.email) {
  //       return res.status(401).json({ message: 'Access Denied' });
  //     }

  //     next();
  //   } catch (err) {
  //     res.status(400).json({ message: 'Invalid Token' });
  //   }
  // },
};

export default Authentication; */
