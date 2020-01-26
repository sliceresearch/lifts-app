const express = require('express');
const app = express();
const liftsRoute = express.Router();

const multer = require('multer');
const path = require('path');

let Lifts = require('../models/Lifts');

/// lifts - read/save user
liftsRoute.route('/read/:user').get((req, res) => {

	console.log('find (read):', req.params.user, req.body)

	Lifts.findOneAndUpdate({
		user: req.params.user
	},
		{
			$set: req.body
		},
		{
			upsert: true
		}, function (err, data) {
			if (err) {
				res.send('error updating lifts');
			} else {
				console.log('update (read):', data);
				//res.send(data);
				res.json(data);
			}
		});
});


/// lifts - process current presentation
liftsRoute.route('/process/:user').put(async (req, res) => {

	console.log('find (process):', req.params.user, req.params.filename)

	var py_result = await global.pyServer.run(req.params.filename);

	var ratings_result = await global.rulesServer.process_presentation_rules('presentation_rating',py_result[0]);
	var data_result = await global.rulesServer.process_presentation_rules('presentation_data',py_result[0]);

	var slides_result = await global.rulesServer.process_presentation_slides(ratings_result);

	var title = "Introduction to Java" //temp
	var author = "Dr John Academic" //temp
	var pname = "ICT999"
	
	console.log('rules (process):', req.body.presentation, ratings_result, slides_result)

	Lifts.findOneAndUpdate({
		user: req.params.user
	}, {
		$set: {
			presentations: { filename: req.body.presentation, name: pname, author: author, title:title, ratings: ratings_result, slides: slides_result, analytics: data_result },
		},
	}, {
		upsert: true
	}, function (err, data) {
		if (err) {
			res.send('error updating lifts:', data);
		} else {
			res.json(data);
		}
	});

});


/// lifts - update
liftsRoute.route('/update/:id').put((req, res, next) => {
	Lifts.findByIdAndUpdate(
		req.params.id,
		{
			$set: req.body
		},
		(error, data) => {
			if (error) {
				return next(error);
				console.log(error);
			} else {
				res.json(data);
				console.log('Data updated successfully');
			}
		}
	);
});


// Delete lifts
liftsRoute.route('/delete/:id').delete((req, res, next) => {
	Lifts.findOneAndRemove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data
			});
		}
	});
});


/// file handling
const DIR = './uploads';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
	 let fn = file.fieldname + '-' + Date.now() + '.' + 'pptx';//path.extname(file.originalname)
	 console.log('fieldname',fn)
      cb(null, fn);
    }
});

let upload = multer({storage: storage});

liftsRoute.route('/upload').post(upload.single('pptx'), function(req, res){

	//console.log(req,res)

	if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true, filename:req.file.filename
        })
      }
})



module.exports = liftsRoute;



/*

			var data_new = {};
			data_new['id'] = data.id
			data_new['name'] = data.name
			var presult = await global.pyServer.run()
		*/

/*
liftsRoute.route('/create1').post((req, res, next) => {

	Lifts.statics.findOrCreate = async (conditions, opt_attr) => {
		let document = await Lifts.findOne(conditions);

		return document || await new Lifts({ ...conditions, ...opt_attr }).save();
	}

});*/

//const ryu = await Character.findOne({ name: 'Ryu' })

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
