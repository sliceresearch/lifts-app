const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Lifts = new Schema(
  {
    user: {
      type: String
    },

    email: {
      type: String
    },

    // current working presentation
    presentation: {
      type: String
    },

    //// user presentations
    presentations: [
      {
        filename: {
          type: String
        },

        name: {
          type: String
        },

        title: {
          type: String
        },

        author: {
          type: String
        },

        slides: [
          {
            index: String,

            title: String,

            id: String,

            title: [
              {
                name: {
                  type: String
                },

                text: []
              }
            ],

            content: [
              {
                name: {
                  type: String
                },

                text: []
              }
            ],

            analytics: [
              {
                group: {
                  type: String
                },

                description: {
                  type: String
                }
              }
            ]
          }
        ],

        analytics: [
          {
            code: {
              type: String
            },

            type: {
              type: String
            },

            description: {
              type: String
            },

            value: {
              type: String
            }
          }
        ],

        ratings: [
          {
            code: {
              type: String
            },

            type: {
              type: String
            },

            description: {
              type: String
            },

            value: {
              type: String
            }
          }
        ]
      }
    ]
  },
  {
    collection: 'lifts'
  }
);

module.exports = mongoose.model('Lifts', Lifts);
