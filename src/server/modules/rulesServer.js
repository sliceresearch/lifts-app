
var RulesServer = function () {
	var _me = this;

	//////////////////////////////////////////////////////////////process
	this.init = function () {
		console.log('rules_server: (init)');
	};

	this.process_presentation_rules = async function (type,results) {
		return this.process_presentation_py(type,results)
	}

	this.process_presentation_py = async function (type,results) {

		let analytics = [];

		Object.entries(results).forEach(([key, value]) => {
			let rule = this.process_rules(key, value, type);
			if (rule != -1)
				analytics.push(rule)
		})

		return analytics;
	};

	this.process_rules = function (rule, value, type) {

		var rtype = this.process_rule_type_py(rule);
		if (rtype != -1) {

			if (rtype == type) {
				var analytic = {
					code: rule,
					type: rtype,
					description: this.process_rule_desc(rule),
					value: value
				}
				return analytic;
			}
		}
		console.log('rules_server: (process-ratings) - rule not found:' + rule);
		return -1;
	}


	//if (rtype=='presentation_data') {



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
				desc = 'Interaction'
				break;
			case "presentation_rating_stars_section":
				desc = 'Sections'
				break;
			case "presentation_rating_stars_accessibility":
				desc = 'Accessibility'
				break;
			case "presentation_rating_stars_text":
				desc = 'Text'
				break;
			case "presentation_count_slide":
				desc = 'Slides'
				break;
			case "presentation_total_words":
				desc = 'Average Word Count'
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

		let slides = [{ title: 'Slide One' }, { title: 'Slide Two' }];

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

