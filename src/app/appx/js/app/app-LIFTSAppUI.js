export default class APP_LIFTSUI {
  constructor() {
    this.init();
  }

  init() {
    APP.UI = {};
    APP.UI.data = {};

    APP.UI.data.Height = 0;
    APP.UI.data.Width = 0;
    APP.UI.data.Depth = 0;
    APP.UI.data.HeightDefault = 0;
    APP.UI.data.WidthDefault = 0;
    APP.UI.data.DepthDefault = 0;

    APP.UI.updateUI = function() {
      var height = document.getElementById('theight').value;
      var width = document.getElementById('twidth').value;
      var depth = document.getElementById('tdepth').value;

      if (height == '') APP.UI.data.Height = APP.UI.data.HeightDefault;
      else APP.UI.data.Height = height;

      if (width == '') APP.UI.data.Width = APP.UI.data.WidthDefault;
      else APP.UI.data.Width = width;

      if (depth == '') APP.UI.data.Depth = APP.UI.data.DepthDefault;
      else APP.UI.data.Depth = depth;

      APP.run.app.updateThing();
    };
  }
}
