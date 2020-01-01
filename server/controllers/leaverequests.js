import queryDb from '../helpers/db';

class LeaveController {
  // @desc     Get all leave requests
  // @route    GET /api/v1/leaverequests
  // @access   Public
  static getLeaveRequests(req, res) {
    const query = 'SELECT * FROM leaverequests';
    queryDb.dbQuery(
      res,
      query,
      'retrieve all leave requests successfully',
      'Leave requests not found'
    );
  }

  // @desc     Create new leave requests
  // @route    POST /api/v1/leaverequests
  // @access   Private
  static createLeaveRequests(req, res) {
    const {
      duration,
      start_date,
      end_date,
      leave_type,
      description,
      status
    } = req.body;
    if (
      !duration ||
      !start_date ||
      !end_date ||
      !leave_type ||
      !description ||
      !status
    ) {
      res
        .status(400)
        .json({ success: false, message: 'Please provide complete details' });
    } else {
      const query = {
        text:
          'INSERT INTO leaverequests(duration, start_date, end_date, leave_type, description, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [
          duration,
          start_date,
          end_date,
          leave_type,
          description,
          status
        ]
      };
      queryDb.dbQuery(
        res,
        query,
        'A new leave requests created successfully',
        'Leave request not found'
      );
    }
  }
}

export default LeaveController;
