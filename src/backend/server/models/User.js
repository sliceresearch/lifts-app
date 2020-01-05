const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   presentations: {
        type: Schema.Types.ObjectId,
        ref: "Presentation"
   }
}, {
   collection: 'users'
})

module.exports = mongoose.model('User', User)