import express from 'express';
import passport from 'passport';
import { SOME_THING_WENT_WRONG } from '../constant/index.js';
import db from '../models/index.js';
import { authorizeValidation, generateServerErrorCode } from '../utils/validation.js';

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
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

eventTypeController.put('/:id', authorizeValidation, (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updateData = { name };
    EventCategory.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true, useFindAndModify: false },
      (error, data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(500).send({
            error,
            message: "Some error occurred while updating the type of event.",
          });
        }
      })
  } catch (e) {
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

eventTypeController.delete('/:id', authorizeValidation, (req, res) => {
  try {
    const { id } = req.params;
    EventCategory.findByIdAndRemove({ _id: id })
      .then((data) => {
        res.send({
          success: true,
          data: {}
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while deleting the type of event.",
        });
      });
  } catch (e) {
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

eventTypeController.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  EventCategory.find({}, null, { sort: { updatedAt: -1 } }, (err, result) => {
    res.status(200).json({
      data: result,
    });
  });
});

export default eventTypeController;