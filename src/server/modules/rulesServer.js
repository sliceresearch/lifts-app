
var RulesServer = function () {
	var _me = this;

	//////////////////////////////////////////////////////////////process
	this.init = function () {
		console.log('rules_server: (init)');
	};

	this.process_presentation_rules = async function () {
		return this.process_presentation_py()
	}

	this.process_presentation_py = async function () {

		let analytics = [];

		var py_result = await global.pyServer.run();

		Object.entries(py_result[0]).forEach(([key, value]) => {
			let rule = this.process_rule(key, value);
			if (rule != -1)
				analytics.push(rule)
		})

		return analytics;
	};

	this.process_rule = function (rule, value) {

		var rtype = this.process_rule_type_py(rule);
		if (rtype != -1) {
			var analytic = {

				code: rule,
				type: rtype,
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
			case "presentation_count_slide":
				rtype = 'Number of Slides'
				break;
		//	case "presentation_count_layout":
		//		rtype = 'Layouts'
		//		break;
			case "presentation_total_words":
				rtype = 'Total word count'
				break;
		//	case "presentation_warning_text_heavy":
		//		rtype = 'Warnings'
		//		break;
			default:
				rtype = -1
				break;
		}

		return rtype;

	}

	//////////////////////////////////////////////////////////////generate


	this.process_presentation_slides = async function () {
		return this.process_presentation_slides_py()
	}

	this.process_presentation_slides_py = async function (rules) {

		let slides = [{title:'Slide One'},{title:'Slide Two'}];

	/*	switch (rule) {

			case "presentation_data_slides":
				slides = this.process_presentation_slide_py = async function (rules) {
				break;

			default:
				break;
		}*/

		return slides;

	};

};

module.exports = RulesServer;

