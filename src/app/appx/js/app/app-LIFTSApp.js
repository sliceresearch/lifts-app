import APPX_ARApp from '../appx/xr/app/appx-XRApp';

import APPX_ObjectTypeSphereDebug from '../appx/object/type/appx-ObjectTypeSphereDebug';

import APP_LIFTSUI from './app-LIFTSAppUI';
//import {APPX_ObjectTypeSphereWorldControl3DRay} from "../appx/object/type/appx-ObjectTypeSphereWorldControl3DRay";
//import APP_UICarousel from '../ui/carousel/app-UICarousel';
//import APPX_ObjectARTypeCube from '../appx/object/ar/appx-ObjectARTypeCube';

export default class APP_LIFTS extends APPX_ARApp {
  constructor() {
    super();

    APPX.alogApp('app_app: (new)');
  }

  init() {
    this.initUI();
    this.initProperties();
    this.initApp();

    // this.initObjects();

    APPX.alogApp('app_app: (ready)');
  }

  initUI() {
    this.ui = new APP_LIFTSUI();
  }

  initAppScene() {
    APPX.alogApp('toastar_app: (init)');
    //  this.space = new APP_HoloSpace();
    //  this.space.init();

    //  this.portal = new APP_HoloPortal();
    //  this.portal.init();

    //   this.debugObjs = new APPX_ObjectTypeSphereDebug(.1, 4, 4);
    //   this.debugObjs.add();

    //   this.debugObjs.positionXYZ(.1,0,-1);

    //   console.log(this,APPX.scene)
  }

  start() {
    //  this.space.start();
  }

  stop() {}

  cycle() {
    this.cycleAR();
    //  this.space.cycle();
  }

  resize() {
    //    this.space.resize();
  }

  eventDown() {}

  eventUp(id, pointer, opts) {
    console.log('eventUp', opts.point);
    //  alert(id, pointer, opts);
    this.envMgr.setEnvEvent('place', id, opts);
  }

  eventDrag() {}

  eventHit(x, y, z) {
    let opts = { point: { x: x, y: y, z: z } };
    this.envMgr.setEnvEvent('place', 0, opts);
  }

  /*
"data": {
  "warranty": 5.0,
  "brand": "Bellini",
  "origin": "China",
  "model": "4 Slice Countdown Toaster BTT780",
  "price": "80.0",
  */

  objectData(olist) {
    //console.log(olist,APP.language)
    let t = olist.data.brand;
    let d = olist.data.model;

    //  let tl = t[APP.language];
    //    let dl = d[APP.language];

    let data = { brand: t, model: d };
    return data;
  }
}
