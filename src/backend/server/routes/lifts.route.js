const express = require('express');
const app = express();
const liftsRoute = express.Router();

let Lifts = require('../models/Lifts');


/*
liftsRoute.route('/create1').post((req, res, next) => {

	Lifts.statics.findOrCreate = async (conditions, opt_attr) => {
		let document = await Lifts.findOne(conditions);

		return document || await new Lifts({ ...conditions, ...opt_attr }).save();
	}

});*/

//const ryu = await Character.findOne({ name: 'Ryu' })

liftsRoute.route('/read/:user').get((req, res) => {
	Lifts.findOne({ user: req.params.user }, (error, data) => {

		console.log('readName:', data, req.params.user);
		if (data == undefined) {
			let ndata = new Lifts({ user: req.params.user })
			console.log('readName-new:', ndata);
			Lifts.create(ndata, async (error, data) => {
				if (error) {
					console.log('error', error)
				} else {
					console.log('readName-save:', data);
					res.json(data)
				}
			})

		} else {
			res.json(data)
		}
	})
})

/*
liftsRoute.route('/create').post((req, res, next) => {

	Lifts.create(req.body, async (error, data) => {
		if (error) {
			return next(error)
		} else {
			var data_new = {};
			data_new['id'] = data.id
			data_new['name'] = data.name
			var presult = await global.pyServer.run()
			data_new.analytics = presult;
			console.log('data', data_new)
			res.json(data_new)
		}
	})

});*/


liftsRoute.route('/latest').get((req, res) => {
	Lifts.findOne((error, data) => {
		if (error) {
			return next(error)
		} else {
			res.json(data)
		}
	})
})

// Get All Liftss
liftsRoute.route('/').get((req, res) => {
	Lifts.find((error, data) => {
		if (error) {
			return next(error)
		} else {
			res.json(data)
		}
	})
})

// Get single lifts
liftsRoute.route('/read/:id').get((req, res) => {
	Lifts.findById(req.params.id, (error, data) => {
		if (error) {
			return next(error)
		} else {
			res.json(data)
		}
	})
})


// Update lifts
liftsRoute.route('/update/:id').put((req, res, next) => {
	Lifts.findByIdAndUpdate(req.params.id, {
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

// Delete lifts
liftsRoute.route('/delete/:id').delete((req, res, next) => {
	Lifts.findOneAndRemove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data
			})
		}
	})
})

module.exports = liftsRoute;



  //Tweet.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
//	cb( null, post.created_at.getTime() );
 // });

//express.get('/', asyncHandler(async (req, res, next) => {
//	const bar = await foo.findAll();
//	res.send(bar)
//}))
/*
liftsRoute.route('/create').post(asyncHandler(async (req, res, next) => {

	Lifts.create(req.body, (error, data) => {
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
// Add Lifts
liftsRoute.route('/create').post((req, res, next) => {
  Lifts.create(req.body, (error, data) => {
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