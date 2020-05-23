//import queryDb from '../helpers/db';
import bcrypt from 'bcryptjs';
import connection from '../helpers/conn';
import registerValidation from '../validations/validate.register';
import loginValidation from '../validations/validate.login';
import jwt from 'jsonwebtoken';
import config from '../config/config';
const { secretKey } = config;

const db = connection();
db.connect();

const UsersController = {
  async signUp(req, res) {
    // Validate before creating user
    const { error } = registerValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    /* return res.status(400).send(error.details[0].message); */
    //checking if user is already in the database
    const checkQuery = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(checkQuery, [req.body.email]);
    if (rows[0])
      return res
        .status(400)
        .json({ success: false, message: 'Email already exist' });
    /* return res.status(400).send('Email already exist'); */

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      const result = await db.query(
        'INSERT INTO users (first_name,last_name,email,password,is_admin) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [
          req.body.first_name,
          req.body.last_name,
          req.body.email,
          hashedPassword,
          req.body.is_admin,
        ]
      );
      return res.status(201).json({ success: true, data: result.rows[0] });
    } catch (e) {
      //   console.log(e);
      return res.json(e);
    }
  },

  async login(req, res) {
    // Validate before creating user
    const { error } = loginValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    /* return res.status(400).send(error.details[0].message); */
    //checking if user is already in the database
    const checkQuery = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(checkQuery, [req.body.email]);
    if (!rows[0])
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });
    /* return res.status(400).send('Email not found'); */

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, rows[0].password);
    if (!validPass)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });

    //   const { is_admin } = rows[0];
    // if (!is_admin) {
    //   return res.status(400).json({ message: 'Not Authorized ' });

    /* return res.status(400).send('Invalid password'); */

    //Create and assign a token
    const token = jwt.sign(
      { user_id: rows[0].id, is_admin: rows[0].is_admin, email: rows[0].email },
      secretKey,
      { expiresIn: '24h' }
    );

    //rows[0].token = token;
    res.header('auth-token', token).send(token);
    //res.header('auth-token', token).json({ success: true, token });
    /* res.header('auth-token', token).json({ status: 'success', data: rows[0] }); */
    //res.status(201).json({ success: true, data: rows[0] });
    //res.status(201).json({ success: true, token });
  },

  // @desc     Get all users
  // @route    GET /api/v1/users
  // @access   Public
  async getUsers(req, res) {
    try {
      const results = await db.query('SELECT * FROM users');
      if (!results)
        return res
          .status(400)
          .json({ success: false, message: 'User not found' });
      return res.status(200).json({ success: true, message: results.rows });
      // const query =
      //   'SELECT id, first_name, last_name, email, is_admin FROM users';
      // const { rows } = await db.query(query);
      // const user = rows;
      // if (!user)
      //   return res
      //     .status(400)
      //     .json({ success: false, message: 'User not found' });
      // return res.status(200).json({ success: true, message: user });
    } catch (err) {
      return res.status(404).json({ success: false, message: err });
    }
  },

  // @desc     Get single user
  // @route    GET /api/v1/users/:id
  // @access   Public
  async getUserById(req, res) {
    try {
      const result = await db.query('SELECT * FROM users WHERE id=$1', [
        req.params.id,
      ]);

      if (!result.rows[0])
        return res
          .status(400)
          .json({ success: false, message: 'User not found' });

      return res.status(200).json({ success: true, message: result.rows[0] });
      //return res.status(200).json({ is_admin: is_admin });
    } catch (err) {
      return res.status(404).json({ success: false, message: err });
    }
  },

  async getCurrentUser(req, res) {
    try {
      const result = await db.query('SELECT * FROM users WHERE email=$1', [
        //req.user.user_id,
        req.user.email,
      ]);
      // if (!result.rows[0])
      //   return res
      //     .status(400)
      //     .json({ success: false, message: 'User not found' });

      return res.status(200).json({ success: true, message: result.rows[0] });
    } catch (error) {
      return res.json(error);
    }
  },

  // @desc     Update user
  // @route    PUT /api/v1/users/:id
  // @access   Private
  // async update(req, res, next) {
  //   //const is_admin = true;
  //   try {
  //     const result = await db.query(
  //       'UPDATE users SET first_name = $1, last_name = $2, email = $3, is_admin = $4 WHERE id = $5 RETURNING *',
  //       [
  //         req.body.first_name,
  //         req.body.last_name,
  //         req.body.email,
  //         req.body.is_admin,
  //         req.params.id,
  //       ]
  //     );
  //     return res.json(result.rows[0]);
  //   } catch (err) {
  //     return next(err);
  //   }
  // },

  // @desc     Delete user
  // @route    PUT /api/v1/users/:id
  // @access   Private

  // async deleteUser(req, res) {
  //   try {
  //     const result = await db.query('DELETE FROM users WHERE id=$1', [
  //       req.params.id,
  //     ]);
  //     return res.json({ message: 'Deleted' });
  //   } catch (err) {
  //     return res.status(400).json({ message: err });
  //   }
  // },
};

export default UsersController;
