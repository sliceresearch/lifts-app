const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Lifts = new Schema(
  {
    user: {
      type: String,
      unique: true
    },

    email: {
      type: String
    },

    //// user presentations
    presentations: [
      {
        name: {
          type: String
        },

        author: {
          type: String
        },

        file_url_source: {
          type: String
        },

        slides: [
          {
            //	index: Int16Array,
            name: String,
            analytics: {}
          }
        ],

        analytics: {
          type: String
        }
      }
    ]
  },
  {
    collection: 'lifts'
  }
);

module.exports = mongoose.model('Lifts', Lifts);
