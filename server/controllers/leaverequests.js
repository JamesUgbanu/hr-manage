import connection from '../helpers/conn';

const client = connection();
client.connect();

class LeaveController {
  // @desc     Create new user
  // @route    POST /api/v1/users
  // @access   Private

  static createLeaveRequests(req, res) {
    LeaveController.create(req, res);
  }

  static create(req, res) {
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

      client.query(query).then(result => {
        return res.status(201).json({
          message: 'A new leave requests created successfully',
          data: result.rows[0]
        });
      });
    }
  }
}

export default LeaveController;
