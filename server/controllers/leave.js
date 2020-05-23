import connection from '../helpers/conn';
import LeaveValidation from '../validations/validate.leave';

const db = connection();
db.connect();

const LeaveController = {
  async createLeave(req, res) {
    // Validate before creating user
    const { error } = LeaveValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    try {
      const result = await db.query(
        'INSERT INTO leaverequests(duration, start_date, end_date, leave_type, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [
          req.body.duration,
          req.body.start_date,
          req.body.end_date,
          req.body.leave_type,
          req.body.description,
        ]
      );
      res.status(201).json({ success: true, message: result.rows[0] });
    } catch (err) {
      return res.status(400).json({ success: false, message: err });
    }
  },

  async getLeaveRequests(req, res) {
    const results = await db.query('SELECT * FROM leaverequests');
    if (!results)
      return res
        .status(400)
        .json({ success: false, message: 'Leave requests not found' });
    return res.status(200).json({ success: true, message: results.rows });
  },

  async getLeaveById(req, res) {
    try {
      const result = await db.query(
        'SELECT * FROM leaverequests WHERE leave_id=$1',
        [req.params.id]
      );
      if (!result.rows[0])
        return res
          .status(400)
          .json({ success: false, message: 'Leave request not found' });
      return res.status(200).json({ success: true, message: result.rows[0] });
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Not found' });
    }
  },

  //   async updateLeaveStatus(req, res) {
  //     try {
  //       const result = await db.query(
  //         'UPDATE leaverequests SET leave_status=$1 WHERE leave_id=$2 RETURNING *',
  //         ['pending', req.params.id]
  //       );
  //       return res.status(200).json({ success: true, message: result.rows[0] });
  //     } catch (err) {
  //       return res.status(400).json({ success: false, message: err });
  //     }
  //   },
};

export default LeaveController;
