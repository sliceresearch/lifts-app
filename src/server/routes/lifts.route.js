const express = require('express');
const app = express();
const liftsRoute = express.Router();

let Lifts = require('../models/Lifts');

/// find lifts user or create
liftsRoute.route('/read/:user').get((req, res) => {
	Lifts.findOneAndUpdate({
        user: req.params.user
    },{
        $set: {
            title: req.body.name,
            author: req.body.file,
            file_url_source: req.body.file_url_source
        }
    },{
        upsert: true
    },function(err, newLifts){
        if(err) {
            res.send('error updating lifts');
        } else {
            console.log(newLifts);
            res.send(newLifts);
        }
    });
});

/*
  Lifts.findOne({ user: req.params.user }, (error, data) => {
    if (data == undefined) {
      let ndata = new Lifts({ user: req.params.user });
      Lifts.create(ndata, async (error, data) => {
        if (error) {
          console.log('error', error);
        } else {
          res.json(data);
        }
      });
    } else {
      res.json(data);
    }
  });*/


/*
router.post('/', function(req, res){
    var newBook = new Book();
    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;
    newBook.save(function(err, book){
        if(err) {
            res.send('error saving book');
        } else {
            console.log(book);
            res.send(book);
        }
    });
});

router.put('/:id', function(req, res){
    Book.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            title: req.body.title,
            author: req.body.author,
            category: req.body.category
        }
    },{
        upsert: true
    },function(err, newBook){
        if(err) {
            res.send('error updating book');
        } else {
            console.log(newBook);
            res.send(newBook);
        }
    });
});
*/

// process lifts
liftsRoute.route('/process/:id').put(async (req, res, next) => {

	var presName = req.body.presentationLatest;
	//var presData = req.body.presentations
	var presult = await global.pyServer.run()

	console.log(presName, presult)
	Lifts.findByIdAndUpdate( req.params.id, {$set: req.body}, (error, data) => {
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

////////////////////////////////////////////////////////////////////////
// Get All Liftss
liftsRoute.route('/').get((req, res) => {
  Lifts.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get  lifts id
liftsRoute.route('/read/:id').get((req, res) => {
  Lifts.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update lifts
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
