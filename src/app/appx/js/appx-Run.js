import APPX_AppEnv from './appx/app/appx-AppEnv.js';
import APPX_AppLoader from './appx/app/appx-AppLoader.js';
import APPX_AppKeys from './appx/app/appx-AppKeys.js';
import APPX_AppObjectStore from './appx/app/appx-AppObjectStore.js';

import APP_LIFTS from './app/app-LIFTSApp';

export default class APP_run {
  //es6
  constructor() {
    //  console.log('app run construct 0');

    APP.directory = window.location.pathname;
    APPX.loader = new APPX_AppLoader();
    APPX.loader.add('spinner', { size: 1, len: 1, rotate: { x: -0.5, y: 0, z: 0 } });

    //  APPX.video = new APPX_AppVideo();
    APPX.env = new APPX_AppEnv();
    this.objectStore = new APPX_AppObjectStore();
    APPX.initObjectStore();

    this.app = new APP_LIFTS();

    APPX.running = false;

    this.init();
    //  console.log('app run construct 1');
  }

  init() {
    APPX.alogKit('(app-init) ');
    this.app.init();
  }

  start() {
    APPX.alogKit('(app-start) ');
    this.app.start();
    APPX.running = true;

    //  APPX.scene.window();
  }

  stop() {
    this.running = false;
    APPX.alogKit(' (app-stop) ');
  }

  started() {
    APPX.alogKit('(app-started) ');
    this.control();
    this.animate();
  }

  animate() {
    APPX.alogKit('(app-animate) ');
    this.unstep();
  }

  scene() {
    // this.control();
  }

  step() {
    APPX.alogKit('(app-step) ');
    this.stepInt = setInterval(function() {
      cycleStep();
    }, 1000 / 29.97);
  }

  unstep() {
    APPX.alogKit('(app-unstep) ');
    clearInterval(this.stepInt);
  }

  parentSet(p) {
    this.parent = p;
  }

}

function cycleStep() {
  if (APPX.running) {
    APP.run.app.cycle();
  }
}
