const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Slide = new Schema({
   name: {
      type: String
   }
}, {
   collection: 'slides'
})

module.exports = mongoose.model('Slide', Slide)