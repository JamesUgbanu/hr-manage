import { check } from 'express-validator';

const checkNewLeaveRequests = [
  check('duration')
    .not()
    .isEmpty()
    .withMessage('Duration is required')
    .isNumeric()
    .withMessage('Duration should be numeric'),
  check('start_date')
    .not()
    .isEmpty()
    .withMessage('Start date is required'),
  check('end_date')
    .not()
    .isEmpty()
    .withMessage('End date is required'),
  check('leave_type')
    .not()
    .isEmpty()
    .withMessage('Leave type is required'),
  check('description')
    .not()
    .isEmpty()
    .withMessage('Description is required')
    .isLength({ max: 40 })
    .withMessage('Description should be less than 40 char')
    .custom(value => value.match(/^[A-Za-z\s]+$/))
    .withMessage('Description should be alphanumeric')
    .trim()
    .escape(),
  check('status')
    .not()
    .isEmpty()
];

export default checkNewLeaveRequests;
