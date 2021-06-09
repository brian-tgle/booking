import sha256 from 'sha256';
import { check, param } from 'express-validator';
import passport from 'passport';
import {
  PASSWORD_IS_EMPTY,
  PASSWORD_LENGTH_MUST_BE_MORE_THAN_8,
  USERNAME_IS_EMPTY,
  EMPTY_ROLE,
  EMPTY_FULLNAME,
  EVENT_TYPE_IS_EMPTY,
  LOCATION_IS_EMPTY,
  STATUS,
  ACTION_NOT_ACCEPTABLE,
  EMPTY_DATE,
  EMPTY_REJECTION_RESULT
} from '../constant/index.js';

export const generateHashedPassword = password => sha256(password);
export function generateServerErrorCode(res, code, fullError, msg, location = 'server') {
  const errors = {};
  errors[location] = {
    fullError,
    msg,
  };
return res.status(code).json({
    code,
    fullError,
    errors,
  });
}
// ================================
// Validation:
// Handle all validation check for the server
// ================================
export const authorizeValidation = passport.authenticate('jwt', { session: false });
export const registerValidation = [
  check('username')
    .exists()
    .withMessage(USERNAME_IS_EMPTY),
  check('password')
    .exists()
    .withMessage(PASSWORD_IS_EMPTY)
    .isLength({ min: 8 })
    .withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
  check('role')
    .exists()
    .withMessage(EMPTY_ROLE),
  check('fullname')
    .exists()
    .withMessage(EMPTY_FULLNAME)
];
export const loginValidation = [
  check('username')
    .exists()
    .withMessage(USERNAME_IS_EMPTY),
  check('password')
    .exists()
    .withMessage(PASSWORD_IS_EMPTY)
    .isLength({ min: 8 })
    .withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
];
export const createBookingValidation = [
  authorizeValidation,
  check('eventCategory')
    .exists()
    .withMessage(EVENT_TYPE_IS_EMPTY),
  check('location')
    .exists()
    .withMessage(LOCATION_IS_EMPTY),
  check('proposedDateOptions')
    .exists()
    .isArray({ min: 3 })
];

export const updateBookingValidation = [
  authorizeValidation,
  check('action')
    .exists()
    .isIn([STATUS.APPROVED, STATUS.REJECTED])
    .withMessage(ACTION_NOT_ACCEPTABLE),
  check('proposedDate')
    .exists()
    .withMessage(EMPTY_DATE),
  check('rejectionReason')
    .if(param('action').equals(STATUS.REJECTED)).exists().withMessage(EMPTY_REJECTION_RESULT)
]