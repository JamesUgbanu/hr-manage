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

  // @desc     Get single leave requests
  // @route    GET /api/v1/leaverequests/:id
  // @access   Public
  static getLeaveRequestsById(req, res) {
    const id = req.params.id;
    const query = `SELECT * FROM leaverequests WHERE leave_id = '${id}'`;
    queryDb.dbQuery(
      res,
      query,
      'get single leave request successfully',
      `Cannot find leave request with the id ${id}`
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

  // @desc     Update leaverequests
  // @route    PUT /api/v1/leaverequests/:id
  // @access   Private
  static updateLeaveRequest(req, res) {
    const leave_id = req.params.id;

    const {
      duration,
      start_date,
      end_date,
      leave_type,
      description,
      status
    } = req.body;

    const query = {
      text:
        'UPDATE leaverequests SET duration = $1, start_date = $2, end_date = $3, leave_type = $4, description = $5, status = $6 WHERE leave_id = $7 ',
      values: [
        duration,
        start_date,
        end_date,
        leave_type,
        description,
        status,
        leave_id
      ]
    };
    queryDb.dbQuery(
      res,
      query,
      'Update leave request successfully',
      `Cannot find leave request with the id ${leave_id}`
    );
  }
}

export default LeaveController;
