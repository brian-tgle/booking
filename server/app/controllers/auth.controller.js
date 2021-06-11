import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { validationResult } from 'express-validator';
import { config } from '../config/index.js';
import {
  generateHashedPassword,
  generateServerErrorCode,
  registerValidation,
  loginValidation,
} from '../utils/validation.js';
import {
  SOME_THING_WENT_WRONG,
  USER_EXISTS_ALREADY,
  WRONG_PASSWORD,
  USER_DOES_NOT_EXIST,
} from '../constant/index.js';
import db from '../models/index.js';

const User = db.users;

const userController = express.Router();

const createUser = (username, password, role, fullname) => {
  const data = {
    username,
    password: generateHashedPassword(password),
    role,
    fullname
  };
  return new User(data).save();
}

/**
 * POST/
 * Register a user
 */
userController.post('/register', registerValidation, async (req, res) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty()) {
    return res.status(400).json({
      code: 400,
      errors: errorsAfterValidation.mapped(),
    });
  }
  try {
    const { username, password, role, fullname } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      await createUser(username, password, role, fullname);

      // Sign token
      const newUser = await User.findOne({ username });
      const token = jwt.sign({ username }, config.passport.secret, {
        expiresIn: config.passport.expiresIn,
      });
      const userToReturn = { ...newUser.toJSON(), ...{ token } };

      delete userToReturn.hashedPassword;

      res.status(200).json(userToReturn);
    } else {
      generateServerErrorCode(res, 403, 'register username error', USER_EXISTS_ALREADY, 'username');
    }
  } catch (e) {
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});
/**
 * POST/
 * Login a user
 */
userController.post('/login', loginValidation, async (req, res) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty()) {
    return res.status(400).json({
      code: 400,
      errors: errorsAfterValidation.mapped(),
    });
  }
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && user.username) {
    const isPasswordMatched = user.comparePassword(password);
    if (isPasswordMatched) {
      // Sign token
      const token = jwt.sign({ username }, config.passport.secret,
        {
          expiresIn: config.passport.expiresIn,
        });
      const userToReturn = { ...user.toJSON(), ...{ token } };
      delete userToReturn.password;
      res.status(200).json(userToReturn);
    } else {
      generateServerErrorCode(res, 403, 'login password error', WRONG_PASSWORD, 'password');
    }
  } else {
    generateServerErrorCode(res, 404, 'login username error', USER_DOES_NOT_EXIST, 'username');
  }
});

userController.get(
  '/list',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find({}, (err, result) => {
      res.status(200).json({
        data: result,
      });
    });
  }
);
export default userController;