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

						shapes: [

							{

								name: {
									type: String
								},

								type: {
									type: String
								},

								text: []

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
