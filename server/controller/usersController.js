import dotenv from 'dotenv';
import conn from '../helpers/conn';

dotenv.config();
const client = conn();
client.connect();

class UsersController {
  /**
       *  Signup a user
       *  @param {Object} request
       *  @param {Object} response
       *  @return {Object} json
       */
  static addUser(request, response) {
    const {
      email,
      firstName,
      lastName,
    } = request.body;

    const query = {
      text: 'INSERT INTO users(first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *',
      values: [firstName, lastName, email],
    };
    UsersController.addUserQuery(request, response, query);
  }

  /**
       *  Run user addUser query
       *  @param {Object} request
       *  @param {Object} response
       * @param {String} query
       *  @return {Object} json
       *
       */
  static addUserQuery(request, response, query) {
    client.query(query)
      .then(dbResult => response.status(201).json({
        status: 201,
        data: {
          id: dbResult.rows[0].id,
          firstName: dbResult.rows[0].first_name,
          lastName: dbResult.rows[0].last_name,
          email: dbResult.rows[0].email
        },
      }))
      .catch();
  }
}
export default UsersController;
