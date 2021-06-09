export const config = {
  passport: {
    secret: process.env.SECRET_KEY,
    expiresIn: '1d',
  },
  env: {
    port: process.env.PORT || 5000
  },
  db: {
    url: process.env.MONGODB_URL
  },
  corsOptions: {
    origin: process.env.ALLOW_CORS || 'http://localhost:3000'
  }
};
export const underscoreId = '_id';