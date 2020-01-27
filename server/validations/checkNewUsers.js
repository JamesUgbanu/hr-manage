import { check } from 'express-validator';

const checkNewUser = [
  check('firstName')
    .not()
    .isEmpty()
    .withMessage('First name is required')
    .custom(value => value.match(/^[A-Za-z\s]+$/))
    .withMessage('First name should be alphabet')
    .trim()
    .escape(),
  check('lastName')
    .not()
    .isEmpty()
    .withMessage('Last name is required')
    .custom(value => value.match(/^[A-Za-z\s]+$/))
    .withMessage('Last name should be alphabet')
    .trim()
    .escape(),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .withMessage('Please enter valid email address')
];

export default checkNewUser;
