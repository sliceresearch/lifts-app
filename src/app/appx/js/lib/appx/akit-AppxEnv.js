export default class AKIT_AppxEnv {
  constructor() {
    this.browser = 'generic';

    this.init();
  }

  init() {
    // console.log(window.navigator.userAgent);

    this.setBrowser();
    this.setHost();
  }

  setBrowser() {
    if (window.navigator.userAgent.indexOf('Firefox') > -1)
      this.browser = 'firefox';

    if (window.navigator.userAgent.indexOf('Chrome') > -1)
      this.browser = 'chrome';

    if (window.navigator.userAgent.indexOf('Edge') > -1) this.browser = 'edge';

    return false;
  }

  setHost() {
    if (
      window.location.hostname == 'localhost' ||
      window.location.hostname == '127.0.0.1'
    ) {
      /// local
      APP.host =
        APP.protocolDevelopment +
        '//' +
        APP.hostDevelopment +
        ':' +
        APP.portDevelopment +
        '/';
      APP.objDir = APP.objDirDevelopment;
      APP.markerDirectory = APP.markerDirDevelopment;
    } else {
      APP.host =
        APP.protocolProduction +
        '//' +
        APP.hostProduction +
        ':' +
        APP.portProduction +
        '/';
      APP.objDir = APP.objDirProduction;
      APP.markerDirectory = APP.markerDirProduction;
    }

    APPX.alogApp(
      '(directory) host:' +
        APP.host +
        ' obj:' +
        APP.objDir +
        ' marker:' +
        APP.markerDirectory
    );
  }
}
