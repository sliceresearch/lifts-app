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
						title: String,

						analytics: [

							{

								code: {
									type: String
								},

								type: {
									type: String
								},

								rule: {
									type: String
								},

								description: {
									type: String
								},

								value: {}

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
				]
			}
		]
	},
	{
		collection: 'lifts'
	}
);

module.exports = mongoose.model('Lifts', Lifts);
