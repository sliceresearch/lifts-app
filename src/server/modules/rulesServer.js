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

		var rtype = this.process_rule_type_py(rule);
		if (rtype != -1) {
			var analytic = {

				code: rule,
				type: rtype, //this.process_rule_type_py(rcode),
				description: 'test description of rule', //this.process_rule_desc_py(rcode),
				value: value

			}
			return analytic;
		}
		console.log('rules_server: (process) - rule not found:' + rule);
		return -1;
	}

	// media_group_type
	this.process_rule_type_py = function (rule) {

		let rtype;

		switch (rule) {
			case "presentation_rating_stars_interaction":
				rtype = 'Interaction score'
				break;
			case "presentation_rating_stars_section":
				rtype = 'Sections score'
				break;
			case "presentation_rating_stars_accessibility":
				rtype = 'Accessibility score'
				break;
			case "presentation_rating_stars_text":
				rtype = 'Text score'
				break;
			default:
				rtype = -1
				break;
		}

		return rtype;

	}



};

module.exports = RulesServer;

