var path = require('path');

//var lifts_rules = path.join(__dirname, '../definitions/lift_rules.json');

var lifts_rules = require('../definitions/lift_rules.json');

var RulesServer = function() {
  var _me = this;

  //////////////////////////////////////////////////////////////process
  this.init = function() {
    // console.log('rules_server: (init)');

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
    //  console.log('rules_server: (process-ratings) - rule not found:' + rule);
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

  this.process_presentation_total_analytics = async function(slides) {
    var analytics_total = 0;

    for (var i = 0; i < slides.length; i++) {
      var slide = slides[i];
      analytics_total = analytics_total + slide.analytics.length;
    }

    return analytics_total;
  };

  //////////////////////////////////////////////////////////////rule

  this.load_rules = function() {};

  this.check_rule = function(rule_name, rule_test) {
    //check rule exists
    let rule_data = lifts_rules[rule_name];

    if (!rule_data) {
      console.log('rules_server: (check-rule) - rule not found:' + rule_name);
      return -1;
    }
    //check rule value exists
    let rule_value = rule_data['value'];

    if (!rule_value) {
      console.log('rules_server: (check-rule) - rule value not found:' + rule_name);
      return -1;
    }
    //check rule condition exists
    let rule_condition = rule_data['condition'];

    if (!rule_condition) {
      console.log('rules_server: (check-rule) - rule condition not found:' + rule_name);
      return -1;
    }

    console.log('rules_server: (check-rule)' + rule_name + ' ' + rule_value + ' ' + rule_condition + ' ' + rule_test);

    if (this.check_rule_condition(rule_condition, rule_value, rule_test)) {
      let rule_out = { description: rule_data.description, group: rule_data.group };
      return rule_out;
    }

    return 0;
  };

  this.check_rule_condition = function(rule_condition, rule_value, rule_test) {
    switch (rule_condition) {
      case '>':
        if (rule_test > rule_value) return 1;
        break;
      default:
        break;
    }

    return 0;
  };

  //////////////////////////////////////////////////////////////slides

  this.process_presentation_slides = async function(slides_data) {
    return this.process_presentation_slides_py(slides_data);
  };

  this.process_presentation_slides_py = async function(slides_data) {
    let slides = [];
    let slide_data = slides_data.presentation_data_slides;

    for (var i = 0; i < slide_data.length; i++) {
      var slide = slide_data[i];
      let slide_out = this.process_presentation_slide(i + 1, slide);
      if (slide_out != -1) slides.push(slide_out);
    }

    return slides;
  };

  this.process_presentation_slide = function(i, slide) {
    // console.log('slides (process):', i, slide);

    let shape_data_title = this.process_presentation_slide_shapes(i, 'title', slide.shapes);
    let shape_data_text_content = this.process_presentation_slide_shapes(i, 'content', slide.shapes);

    let slide_out = {
      index: i,
      title: slide.name,
      id: slide.id,
      title: shape_data_title,
      content: shape_data_text_content
    };

    let slide_analytics = this.process_slide_analytics_content(shape_data_text_content);

    slide_out.analytics = slide_analytics;

    //  console.log('slides (process-out):', i, slide_out);

    return slide_out;
  };

  this.process_presentation_slide_shapes = function(index, type, shapes) {
    let shapes_out = [];
    for (var i = 0; i < shapes.length; i++) {
      var shape = shapes[i];
      if (shape.type == type) {
        let shape_text = this.process_presentation_slide_text(shape.paragraphs);
        let shape_out = { name: shape.name, text: shape_text };
        //   console.log('slides (process-shape):', type, index, i, shape_out);
        shapes_out.push(shape_out);
      }
    }

    return shapes_out;
  };

  //////////////////////////////////////////////////////////////analyse slides

  this.process_presentation_slide_text = function(paragraphs) {
    //   console.log('rules_server: (slide-paragraphs):');

    return paragraphs;
  };

  this.process_slide_analytics_content = function(shapes) {
    let analytics = [];

    let rule_check;

    for (var i = 0; i < shapes.length; i++) {
      var shape = shapes[i];
      let text = shape.text;

      // bullet_points_per_slide
      rule_check = this.check_rule('bullet_points_per_slide', text.length);
      //    console.log('rules_server: (slide-analytics):', rule_check, text.length);
      if (rule_check) analytics.push(rule_check);
    }

    //  console.log('rules_server: (slide-analytics):', analytics.length);

    return analytics;
  };
};

module.exports = RulesServer;
