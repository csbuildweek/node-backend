require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// *** ROUTES ***
const testRoutes = require('./routes/test.js');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader(`Access-Control-Allow-Origin`, '*');
  res.setHeader(
    `Access-Control-Allow-Methods`,
    `OPTIONS, GET, POST, PUT, PATCH, DELETE`,
  );
  res.setHeader(`Access-Control-Allow-Headers`, 'Content-Type, Authorization');
  next();
});

// *** USE ROUTES ***
app.use('/test', testRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message: message, data: data});
});

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PW
  }@nodemud-aafiq.mongodb.net/treasureseeker`,
  {useNewUrlParser: true},
).then(result => {
  app.listen(8082);
}).catch(err => console.log(err));
