import queryDb from '../helpers/db';

class UsersController {
  // @desc     Get all users
  // @route    GET /api/v1/users
  // @access   Public
  static getUsers(req, res) {
    const query = 'SELECT id, first_name, last_name, email FROM users';
    queryDb.dbQuery(
      res,
      query,
      'retrieve all users successfully',
      'User not found'
    );
  }

  // @desc     Get single user
  // @route    GET /api/v1/users/:id
  // @access   Public
  static getUserById(req, res) {
    const id = parseInt(req.params.id);
    if (!Number(id)) {
      return res.status(400).json({
        success: false,
        message: 'Please input a valid numeric value'
      });
    }
    const query = `SELECT * FROM users WHERE id = '${id}'`;
    queryDb.dbQuery(
      res,
      query,
      'retrieve a single user successfully',
      `Cannot find user with the id ${id}`
    );
  }

  // @desc     Create new user
  // @route    POST /api/v1/users
  // @access   Private
  static createUser(req, res) {
    const { firstName, lastName, email } = req.body;
    const query = {
      text:
        'INSERT INTO users(first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *',
      values: [firstName, lastName, email]
    };
    queryDb.dbQuery(
      res,
      query,
      'A new user created successfully',
      'User not found'
    );
  }
  /*  static createUser(req, res) {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      res
        .status(400)
        .json({ success: false, message: 'Please provide complete details' });
    } else {
      const query = {
        text:
          'INSERT INTO users(first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *',
        values: [firstName, lastName, email]
      };
      queryDb.dbQuery(
        res,
        query,
        'A new user created successfully',
        'User not found'
      );
    }
  } */

  // @desc     Update user
  // @route    PUT /api/v1/users/:id
  // @access   Private
  static updateUser(req, res) {
    const id = parseInt(req.params.id);
    if (!Number(id)) {
      res.status(400).json({
        success: false,
        message: 'Please input a valid numeric value'
      });
    } else {
      const { firstName, lastName, email } = req.body;
      const query = {
        text:
          'UPDATE users SET first_name = $1, last_name = $2, email = $3  WHERE id = $4 ',
        values: [firstName, lastName, email, id]
      };
      queryDb.dbQuery(
        res,
        query,
        'Update Successfully',
        `Cannot find user with the id ${id}`
      );
    }
  }

  // @desc     Delete user
  // @route    PUT /api/v1/users/:id
  // @access   Private
  static deleteUser(req, res) {
    const id = parseInt(req.params.id);
    if (!Number(id)) {
      res
        .status(400)
        .json({ success: false, message: 'Please provide a numeric valuer' });
    } else {
      const query = `DELETE FROM users WHERE id= '${id}'`;
      queryDb.dbQuery(
        res,
        query,
        'User deleted successfully',
        `Cannot find user with the id ${id}`
      );
    }
  }
}

export default UsersController;
