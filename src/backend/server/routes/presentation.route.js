const express = require('express');
const app = express();
const presentationRoute = express.Router();

// Presentation model
let Presentation = require('../models/Presentation');

presentationRoute.route('/create').post((req, res, next) => {
	Presentation.create(req.body, async (error, data) => {
		var presult = await global.pyServer.run()
		if (error) {
			return next(error)
		} else {
			console.log('result', presult)
			res.json(presult)
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




//express.get('/', asyncHandler(async (req, res, next) => {
//	const bar = await foo.findAll();
//	res.send(bar)
//}))
/*
presentationRoute.route('/create').post(asyncHandler(async (req, res, next) => {

	Presentation.create(req.body, (error, data) => {
		console.log('create')
		var analysis = await global.pyServer.run()
	
		console.log('get',analysis)
		if (error) {
		  return next(error)
		} else {
		 console.log('result',analysis)
		  res.json(analysis)
		}
	  })

}))*/


/*
// Add Presentation
presentationRoute.route('/create').post((req, res, next) => {
  Presentation.create(req.body, (error, data) => {
	console.log('create')
	var analysis = global.pyServer.run()

	//  console.log(analysis)
    if (error) {
      return next(error)
    } else {
	 console.log('result',analysis)
      res.json(analysis)
    }
  })
});*/
