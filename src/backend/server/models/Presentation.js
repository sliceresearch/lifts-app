const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Presentation = new Schema({
   name: {
      type: String
   },
   author: {
	type: String
 	},
   email: {
      type: String
   },
   slides: {
	 type:String
   },
   analytics: {
	type:String
  }
}, {
   collection: 'presentations'
})

module.exports = mongoose.model('Presentation', Presentation)