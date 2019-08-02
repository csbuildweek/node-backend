const express = require('express');
const {body} = require('express-validator');

const testController = require('../controllers/test.js');

const router = express.Router();

router.post(
  '/post-test',
  [
    body('name')
      .trim()
      .isLength({min: 5}),
    body('content')
      .trim()
      .isLength({min: 5}),
  ],
  testController.postTests,
);

router.get('/get-tests', testController.getTests);

module.exports = router;
