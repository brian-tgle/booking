import express from 'express';
import passport from 'passport';
import { SOME_THING_WENT_WRONG } from '../constant/index.js';
import db from '../models/index.js';
import { generateServerErrorCode } from '../utils/validation.js';

const EventCategory = db.eventCategories;
const eventTypeController = express.Router();

eventTypeController.post('/', (req, res) => {
  try {
    const { name } = req.body
    const eventCategory = new EventCategory({
      name
    });
    eventCategory
      .save(eventCategory)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the event type.",
        });
      });
  } catch (e) {
    console.log(e);
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

eventTypeController.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  EventCategory.find({}, (err, result) => {
    res.status(200).json({
      data: result,
    });
  });
});

export default eventTypeController;