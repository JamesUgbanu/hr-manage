import { validationResult } from 'express-validator';
import connection from '../helpers/conn';

const client = connection();
client.connect();

class Validator {
  static validatorError(request, response, next) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    next();
  }

  /*  static checkDuplicateEmail(request, response, next) {
    const query = `SELECT email FROM users WHERE email ='${request.body.email}'`;
    client
      .query(query)
      .then(dbResult => {
        if (dbResult.rows[0]) {
          return response.status(400).json({
            success: false,
            status: 400,
            error: 'E-mail already in use'
          });
        }
        return next();
      })
      .catch();
  } */
}
export default Validator;
