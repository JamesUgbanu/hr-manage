import connection from '../helpers/conn';

const client = connection();
client.connect();

class UsersController {
  // @desc     Get all users
  // @route    GET /api/v1/users
  // @access   Public
  static getUsers(req, res) {
    UsersController.find(req, res);
  }

  static find(req, res) {
    const query = 'SELECT id, first_name, last_name, email FROM users';
    client.query(query).then(results => {
      res.status(200).json({
        success: true,
        count: results.rowCount,
        message: 'retrieve all users successfully',
        data: results.rows
      });
    });
  }

  // @desc     Get single user
  // @route    GET /api/v1/users/:id
  // @access   Public

  static getUserById(req, res) {
    UsersController.findById(req, res);
  }

  static findById(req, res) {
    const id = parseInt(req.params.id);
    if (!Number(id)) {
      return res.status(400).json({
        success: false,
        message: 'Please input a valid numeric value'
      });
    }

    const query = `SELECT * FROM users WHERE id = '${id}'`;
    client.query(query).then(result => {
      if (result.rowCount == 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot find user with the id ${id}`
        });
      }
      res.status(200).json({
        success: true,
        message: 'retrieve a single user successfully',
        data: result.rows[0]
      });
    });
  }

  // @desc     Create new user
  // @route    POST /api/v1/users
  // @access   Private

  static createUser(req, res) {
    UsersController.create(req, res);
  }

  static create(req, res) {
    const { firstName, lastName, email } = req.body;

    const query = {
      text:
        'INSERT INTO users(first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *',
      values: [firstName, lastName, email]
    };

    client.query(query).then(result => {
      return res.status(201).json({
        message: 'A new user created successfully',
        data: result.rows[0]
      });
    });
  }

  // @desc     Update user
  // @route    PUT /api/v1/users/:id
  // @access   Private

  static updateUser(req, res) {
    UsersController.findByIdAndUpdate(req, res);
  }

  static findByIdAndUpdate(req, res) {
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

      client.query(query).then(result => {
        if (result.rowCount == 0) {
          return res.status(400).json({
            success: false,
            message: `Cannot find user with the id ${id}`
          });
        }
        res.status(200).json({
          success: true,
          message: 'Update Successfully',
          data: result.rows
        });
      });
    }
  }

  // @desc     Delete user
  // @route    PUT /api/v1/users/:id
  // @access   Private

  static deleteUser(req, res) {
    UsersController.findByIdAndDelete(req, res);
  }

  static findByIdAndDelete(req, res) {
    const id = parseInt(req.params.id);
    if (!Number(id)) {
      res
        .status(400)
        .json({ success: false, message: 'Please provide a numeric valuer' });
    } else {
      const query = `DELETE FROM users WHERE id= '${id}'`;
      client.query(query).then(result => {
        return res.status(200).json({
          message: 'User deleted successfully',
          data: {}
        });
      });
    }
  }
}

export default UsersController;
