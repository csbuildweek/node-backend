const Test = require('../models/test.js');

const { validationResult } = require('express-validator');

exports.postTests = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, eneted data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const content = req.body.content;
  const test = new Test({
    name: name,
    content: content,
  });
  try {
    await test.save();
    res.status(201).json({message: `Test Created Successfully!`, test: test});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTests = async (req, res, next) => {
  try {
    const tests = await Test.find()
    res.status(200).json({ message: 'Fetched Test successfully.', tests: tests })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err)
  }
}
