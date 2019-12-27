import connection from '../helpers/conn';

const client = connection();
client.connect();

class UsersController {
  // @desc     Get all users
  // @route    GET /api/v1/users
  // @access   Public
  static getUsers(req, res) {
    const query = 'SELECT id, first_name, last_name, email FROM users';

    UsersController.find(query, res);
  }

  static find(query, res) {
    client.query(query).then(result => {
      res.status(200).json({
        message: 'retrieve all users successfully',
        data: result.rows
      });
    });
  }

  // @desc     Get single user
  // @route    GET /api/v1/users/:id
  // @access   Public
  static getUserById(req, res) {
    const id = parseInt(req.params.id);

    const query = `SELECT * FROM users WHERE id = '${id}'`;

    UsersController.findById(query, res);
  }

  static findById(query, res) {
    client.query(query).then(result => {
      res.status(200).json({
        message: 'retrieve a single user successfully',
        data: result.rows[0]
      });
    });
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
    UsersController.create(req, res, query);
  }

  static create(req, res, query) {
    client
      .query(query)
      .then(result => {
        return res.status(200).json({
          message: 'A new user created successfully',
          data: result.rows[0]
        });
      })
      .catch(error => console.log(error));
  }

  // @desc     Update user
  // @route    PUT /api/v1/users/:id
  // @access   Private
  static updateUser(req, res) {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email } = req.body;

    const query = {
      text:
        'UPDATE users SET first_name = $1, last_name = $2, email = $3  WHERE id = $4 ',
      values: [firstName, lastName, email, id]
    };

    UsersController.findByIdAndUpdate(req, res, query);
  }

  static findByIdAndUpdate(req, res, query) {
    client.query(query).then(result => {
      return res.status(200).json({
        message: 'Update Successfully'
      });
    });
  }
}

export default UsersController;
