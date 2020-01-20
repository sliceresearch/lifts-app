
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
				description: this.process_rule_desc(rule),
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
				rtype = 'presentation_rating'
				break;
			case "presentation_rating_stars_section":
				rtype = 'presentation_rating'
				break;
			case "presentation_rating_stars_accessibility":
				rtype = 'presentation_rating'
				break;
			case "presentation_rating_stars_text":
				rtype = 'presentation_rating'
				break;
			case "presentation_count_slide":
				rtype = 'presentation_data'
				break;
		//	case "presentation_count_layout":
		//		rtype = 'Layouts'
		//		break;
			case "presentation_total_words":
				rtype = 'presentation_data'
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

	this.process_rule_desc = function (rule) {

		let desc;

		switch (rule) {
			case "presentation_rating_stars_interaction":
				desc = 'Interaction score'
				break;
			case "presentation_rating_stars_section":
				desc = 'Sections score'
				break;
			case "presentation_rating_stars_accessibility":
				desc = 'Accessibility score'
				break;
			case "presentation_rating_stars_text":
				desc = 'Text score'
				break;
			case "presentation_count_slide":
				desc = 'Number of Slides'
				break;
			case "presentation_total_words":
				desc = 'Total word count'
				break;
			default:
				desc = "";
				break;
		}

		return desc;

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

