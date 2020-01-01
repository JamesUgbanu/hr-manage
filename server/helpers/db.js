import connection from '../helpers/conn';

const client = connection();
client.connect();

class queryController {
  static notFoundError(response, message) {
    return response.status(400).json({
      success: false,
      message: message
    });
  }

  static getSuccess(response, status, results, message) {
    return response.status(status).json({
      success: true,
      count: results.rowCount,
      message: message,
      data: results.rows
    });
  }

  static dbQuery(response, query, message, notFound) {
    client
      .query(query)
      .then(result => {
        if (result.rowCount === 0) {
          return queryController.notFoundError(response, notFound);
        }
        queryController.getSuccess(response, 200, result, message);
      })
      .catch(error =>
        response
          .status(500)
          .json({ status: 500, error: `Server error ${error}` })
      );
  }
}

export default queryController;
