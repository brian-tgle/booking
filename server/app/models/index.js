
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import User from './user.model.js';
import Booking from './booking.model.js';
import EventCategory from './eventCategory.model.js';

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.users = User(mongoose, mongoosePaginate);
db.bookings = Booking(mongoose, mongoosePaginate);
db.eventCategories = EventCategory(mongoose, mongoosePaginate);

export default db;
