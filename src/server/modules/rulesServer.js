var path = require('path');

var RulesServer = function () {
	var _me = this;

	//////////////////////////////////////////////////////////////commands
	this.init = function () {
		console.log('rules_server: (init)');
	};

	this.process_presentation = async function () {
		return this.process_presentation_py()
	}

	this.process_presentation_py = async function () {

		let analytics = [];

		var py_result = await global.pyServer.run();

		Object.entries(py_result[0]).forEach(([key, value]) => {
			let rule = this.process_rule(key, value);
			if (rule!=-1)
				analytics.push(rule)
		})

		return analytics;
	};

	this.process_rule = function (rule, value) {

		var rcode = this.process_rule_code_py(rule);
		if (rcode != -1) {
			var analytic = {

				code: rcode,
				type: 'thistype', //this.process_rule_type_py(rcode),
				description: 'test description of rule', //this.process_rule_desc_py(rcode),
				value: value

			}
			return analytic;
		}
		return -1;
	}

	this.process_rule_code_py = function (rule) {

		let rcode;

		switch (rule) {
			case "stars_interaction":
				rcode = 'rating_stars_interaction'
				break;
			case "stars_section":
				rcode = 'rating_stars_section'
				break;
			case "stars_accessibility":
				rcode = 'rating_stars_accessibility'
				break;
			case "stars_text":
				rcode = 'rating_stars_text'
				break;
			default:
				rcode = -1
				break;
		}

		return rcode;

	}



};

module.exports = RulesServer;

