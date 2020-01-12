import AKIT_AppXApp from '../lib/appx/akit-AppxApp';

export default class APP_LIFTS extends AKIT_AppXApp {
  constructor() {
    super();
  }

  init() {
    this.initUI();
    this.initProperties();
    this.initApp();

    // this.initObjects();

    APPX.alogApp('app_app: (ready)');
  }

  initUI() {
    // this.ui = new APP_LIFTSUI();
  }

  initAppScene() {
    APPX.alogApp('toastar_app: (init)');
    //  this.space = new APP_HoloSpace();
    //  this.space.init();
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
