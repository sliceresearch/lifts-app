const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Presentation = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'slides'
})

module.exports = mongoose.model('Presentation', Presentation)