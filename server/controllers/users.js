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
}

export default UsersController;
