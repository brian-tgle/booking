import express from 'express';
import { validationResult } from 'express-validator';
import {
  generateServerErrorCode,
  createBookingValidation,
  updateBookingValidation,
  authorizeValidation
} from '../utils/validation.js';
import { ADMIN, SOME_THING_WENT_WRONG, STATUS } from '../constant/index.js';
import db from '../models/index.js';

const Booking = db.bookings;

const bookingController = express.Router();

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

/**
 * POST/
 * Create an event booking
 */
bookingController.post('/', createBookingValidation, (req, res) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty()) {
    return res.status(400).json({
      code: 400,
      errors: errorsAfterValidation.mapped(),
    });
  }
  try {
    const { eventCategory, location, proposedDateOptions } = req.body;
    const user = req.user;
    console.log(user);
    const booking = new Booking({
      eventCategory,
      location,
      proposedDateOptions,
      status: STATUS.PENDING_REVIEW,
      createdBy: user.id
    });
    booking
      .save(booking)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the booking.",
        });
      });
  } catch (e) {
    console.log(e);
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

bookingController.put('/:action/:bookingId', updateBookingValidation, (req, res) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty()) {
    return res.status(400).json({
      code: 400,
      errors: errorsAfterValidation.mapped(),
    });
  }
  try {
    const { rejectionReason, proposedDate } = req.body;
    const { bookingId, action } = req.params;
    const user = req.user;
    const updateData = {
      ...(action === STATUS.REJECTED ? rejectionReason : {}),
      proposedDate,
      status: action,
      approvedBy: user.id
    };
    console.log(bookingId, action, user.id);
    Booking.findOneAndUpdate(
      { _id: bookingId, status: STATUS.PENDING_REVIEW },
      { $set: updateData, $unset: { "proposedDateOptions": 1 } },
      { new: true, useFindAndModify: false },
      (error, data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(500).send({
            error,
            message: "Some error occurred while updating the booking.",
          });
        }
      })
  } catch (e) {
    console.log(e);
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

bookingController.delete('/:bookingId', authorizeValidation, (req, res) => {
  try {
    const { bookingId } = req.params;
    const user = req.user;
    Booking.findByIdAndRemove({ _id: bookingId, createdBy: user.id, status: STATUS.PENDING_REVIEW })
      .then((data) => {
        res.send({
          success: true,
          data: {}
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while deleting the booking.",
        });
      });
  } catch (e) {
    generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
  }
});

bookingController.get('/', authorizeValidation, (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const user = req.user;
  const condition = user.role === ADMIN ? {} : { createdBy: user.id }
  const populate = [
    {
      path: "eventCategory",
      select: "name",
      model: "eventCategory"
    },
    {
      path: "createdBy",
      select: "fullname",
      model: "user"
    },
    {
      path: "approvedBy",
      select: "fullname",
      model: "user"
    }
  ];
  Booking.paginate(condition, { offset, limit, populate }).then(data => {
    res.status(200).send({
      totalItems: data.totalDocs,
      data: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving booking.",
    });
  });
});

export default bookingController;