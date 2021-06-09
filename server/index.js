import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import { config } from './app/config/index.js';
import { applyPassportStrategy } from './app/utils/passport.js';
import db from './app/models/index.js';
import userController from './app/controllers/auth.controller.js';
import bookingController from './app/controllers/booking.controller.js';
import eventTypeController from './app/controllers/eventCategory.controller.js';

dotenv.config();

const app = express();
applyPassportStrategy(passport);
const corsOptions = {
  origin: config.corsOptions.origin
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

db.mongoose
  .connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((error) => {
    console.log('Cannot connect to the database!', error);
    process.exit();
  });

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Fullerton booking app.' });
});

app.use('/api/auth', userController);
app.use('/api/booking', bookingController);
app.use('/api/eventCategory', eventTypeController);

// set port, listen for requests
const PORT = config.env.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
