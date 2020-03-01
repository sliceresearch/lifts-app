var RulesServer = function() {
  var _me = this;

  //////////////////////////////////////////////////////////////process
  this.init = function() {
    console.log('rules_server: (init)');

    this.load_rules();
  };

  this.process_presentation_rules = async function(type, results) {
    return this.process_presentation_py(type, results);
  };

  this.process_presentation_py = async function(type, results) {
    let analytics = [];

    Object.entries(results).forEach(([key, value]) => {
      let rule = this.process_rules(key, value, type);
      if (rule != -1) analytics.push(rule);
    });

    return analytics;
  };

  this.process_rules = function(rule, value, type) {
    var rtype = this.process_rule_type_py(rule);
    if (rtype != -1) {
      if (rtype == type) {
        var analytic = {
          code: rule,
          type: rtype,
          description: this.process_rule_desc(rule),
          value: value
        };
        return analytic;
      }
    }
    console.log('rules_server: (process-ratings) - rule not found:' + rule);
    return -1;
  };

  // media_group_type
  this.process_rule_type_py = function(rule) {
    let rtype;

    switch (rule) {
      case 'presentation_rating_stars_interaction':
        rtype = 'presentation_rating';
        break;
      case 'presentation_rating_stars_section':
        rtype = 'presentation_rating';
        break;
      case 'presentation_rating_stars_accessibility':
        rtype = 'presentation_rating';
        break;
      case 'presentation_rating_stars_text':
        rtype = 'presentation_rating';
        break;
      case 'presentation_count_slide':
        rtype = 'presentation_data';
        break;
      //	case "presentation_count_layout":
      //		rtype = 'Layouts'
      //		break;
      case 'presentation_total_words':
        rtype = 'presentation_data';
        break;
      //	case "presentation_warning_text_heavy":
      //		rtype = 'Warnings'
      //		break;
      default:
        rtype = -1;
        break;
    }

    return rtype;
  };

  this.process_rule_desc = function(rule) {
    let desc;

    switch (rule) {
      case 'presentation_rating_stars_interaction':
        desc = 'Interaction';
        break;
      case 'presentation_rating_stars_section':
        desc = 'Sections';
        break;
      case 'presentation_rating_stars_accessibility':
        desc = 'Accessibility';
        break;
      case 'presentation_rating_stars_text':
        desc = 'Text';
        break;
      case 'presentation_count_slide':
        desc = 'Slides';
        break;
      case 'presentation_total_words':
        desc = 'Average Word Count';
        break;
      default:
        desc = '';
        break;
    }

    return desc;
  };

  //////////////////////////////////////////////////////////////rule

  this.load_rules = async function() {
    //	this.rules =
  };

  this.check_rule = async function(rule_name, rule_arg, rule_test, rule_condition) {
    //check rule exists
    let rule_data = this.rules[rule_name];

    if (!rule_data) {
      console.log('rules_server: (check-rule) - rule not found:' + rule_name);
      return -1;
    }
    //check rule argument exists
    let rule_arg_data = this.rules[rule_arg];

    if (!rule_arg_data) {
      console.log('rules_server: (check-rule) - rule argument not found:' + rule_name + ' ' + rule_arg);
      return -1;
    }

    this.check_rule_condition(rule_arg, rule_test, rule_condition);

    console.log('rules_server: (check-rule)' + rule_name + ' ' + rule_arg_data);
  };

  this.check_rule_condition = async function(rule_arg, rule_test, rule_condition) {};

  //////////////////////////////////////////////////////////////generate

  this.process_presentation_slides = async function(slides_data) {
    return this.process_presentation_slides_py(slides_data);
  };

  this.process_presentation_slides_py = async function(slides_data) {
    let slides = [];
    let slide_data = slides_data.presentation_data_slides;

    for (var i = 0; i < slide_data.length; i++) {
      var slide = slide_data[i];
      let slide_out = this.process_presentation_slide(i, slide);
      if (slide_out != -1) slides.push(slide_out);
    }

    return slides;
  };

  this.process_presentation_slide = function(i, slide) {
    console.log('slides (process):', i, slide);

    let shape_data = this.process_presentation_slide_shapes(i, slide.shapes);
    let slide_out = { index: i, title: slide.name, id: slide.id, shapes: shape_data };

    console.log('slides (process-out):', i, slide_out);

    return slide_out;
  };

  this.process_presentation_slide_shapes = function(index, shapes) {
    let shapes_out = [];
    for (var i = 0; i < shapes.length; i++) {
      var shape = shapes[i];
      let shape_out = { name: shape.name, type: shape.type, text: shape.paragraphs };
      console.log('slides (process-shape):', index, i, shape_out);
      shapes_out.push(shape_out);
    }

    return shapes_out;
  };
};

module.exports = RulesServer;
