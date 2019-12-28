const express = require('express');
const app = express();
const presentationRoute = express.Router();

// Presentation model
let Presentation = require('../models/Presentation');

// Add Presentation
presentationRoute.route('/create').post((req, res, next) => {
  Presentation.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Presentations
presentationRoute.route('/').get((req, res) => {
  Presentation.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single presentation
presentationRoute.route('/read/:id').get((req, res) => {
  Presentation.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update presentation
presentationRoute.route('/update/:id').put((req, res, next) => {
  Presentation.findByIdAndUpdate(req.params.id, {
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

// Delete presentation
presentationRoute.route('/delete/:id').delete((req, res, next) => {
  Presentation.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = presentationRoute;