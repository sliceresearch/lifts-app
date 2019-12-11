import AKIT_ARApp from '../akit/xr/app/akit-XRApp';

import AKIT_ObjectTypeSphereDebug from '../akit/object/type/akit-ObjectTypeSphereDebug';

import APP_ToastARUI from './app-ToastARAppUI';
//import {AKIT_ObjectTypeSphereWorldControl3DRay} from "../akit/object/type/akit-ObjectTypeSphereWorldControl3DRay";
//import APP_UICarousel from '../ui/carousel/app-UICarousel';
//import AKIT_ObjectARTypeCube from '../akit/object/ar/akit-ObjectARTypeCube';

export default class APP_ToastAR extends AKIT_ARApp {
  constructor() {
    super();

    AKIT.alogApp('app_app: (new)');
  }

  init() {
    this.initUI();
    this.initProperties();
    this.initApp();

    // this.initObjects();

    AKIT.alogApp('app_app: (ready)');
  }

  initUI() {
    this.ui = new APP_ToastARUI();
  }

  initAppScene() {
    AKIT.alogApp('toastar_app: (init)');
    //  this.space = new APP_HoloSpace();
    //  this.space.init();

    //  this.portal = new APP_HoloPortal();
    //  this.portal.init();

    //   this.debugObjs = new AKIT_ObjectTypeSphereDebug(.1, 4, 4);
    //   this.debugObjs.add();

    //   this.debugObjs.positionXYZ(.1,0,-1);

    //   console.log(this,AKIT.scene)
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
