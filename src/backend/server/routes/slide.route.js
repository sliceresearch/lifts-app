const express = require('express');
const app = express();
const slideRoute = express.Router();

// Slide model
let Slide = require('../models/Slide');

// Add Slide
slideRoute.route('/create').post((req, res, next) => {
  Slide.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Slides
slideRoute.route('/').get((req, res) => {
  Slide.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single slide
slideRoute.route('/read/:id').get((req, res) => {
  Slide.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update slide
slideRoute.route('/update/:id').put((req, res, next) => {
  Slide.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete slide
slideRoute.route('/delete/:id').delete((req, res, next) => {
  Slide.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = slideRoute;