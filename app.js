const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// Router
const covidRouter = require('./covid19');

// Middleware
app.use(morgan('dev'))
app.use(cors({
  origin: '*'
}))
app.use('/', covidRouter)
app.use((req, res, next) => {
  const error = new Error('endpoint not found');
  error.status = 404;
  next(error)
})

// Error Handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send({ message: err.message });
});

// Server Listening
app.listen(PORT, () => {
  console.log(`Server is now lisrening on port ${PORT}`)
});