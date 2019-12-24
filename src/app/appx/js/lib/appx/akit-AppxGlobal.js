///// APPX - application toolkit (assimilate interactive three.js toolkit)


export default class AKIT_AppXGlobal {
  constructor() {
    APPX = {};

    //////////////////////////////////////////////////globals
    APPX.system = 0;

    APPX.canvas = 0;
    APPX.renderer = 0;

    APPX.objectIDCount = 0;

    APPX.container = 0;
    APPX.workerTimeDelay = [];

    APPX.running = false;
    APPX.ready = false;

    APPX.windowHeight = window.innerHeight;
    APPX.windowWidth = window.innerWidth;


    //////////////////////////////////////////////////test

    APPX.appxTest = function() {};

    //////////////////////////////////////////////////store

    APPX.initobjectStore = function() {
      if (APPX.objectStore != undefined) {
        APPX.objectStore = new APPX_ObjectStore();
      }
    };

    Array.prototype.store = function(from) {
      const obj = this[from];
      obj.store();
      const rest = this.slice(from + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };

    ///////////////////////////////////////////////////////////////array
    Array.prototype.remove = function(from, to) {
      const rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };

    ///////////////////////////////////////////////////////////////rand
    APPX.getRand = function() {
      return _.random(0, 100000);
    };

    ///////////////////////////////////////////////////////////////RGB
    APPX.getValueRGBAString = function(rf, gf, bf, af) {
      return APPX.getRGBAString(
        Math.round(rf * 255),
        Math.round(gf * 255),
        Math.round(bf * 255),
        af
      );
    };

    APPX.getRGBAString = function(r, g, b, a) {
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    };

    ///////////////////////////////////////////////////////string
    APPX.objToString = function(obj) {
      let str = '';
      for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
          str += p + ',';
        }
      }
      return str;
    };
    ///////////////////////////////////////////////////////trig

    APPX.getAngleDeg = function(x1, y1) {
      let deg = Math.atan2(y1, x1) * pi_half;
      return deg;
    };

    APPX.setDefaultImage = function() {
      APPX.defaultImage = new Image();
    };

    /////////////////////////////////////////////////////logging
    APPX.appxError = function(e) {
      console.log('ERROR: ' + e);
    };

    APPX.alogApp = function(m) {
      console.log('APP:' + m);
    };

    APPX.alogAppP = function(m) {
      console.log('APP:' + m);
    };

    APPX.alogAppA = function(m) {
      console.log('AR-APP:' + m);
    };

    APPX.alogKit = function(m) {
      console.log('KIT: ' + m);
    };

    APPX.alogKitP = function(m) {
      //console.log('KIT: ' + m);
    };

    APPX.alogKitCtl = function(m) {
      console.log('CTL: ' + m);
    };

    APPX.alogKitCtl2 = function(m) {
      // console.log('CTL2: ' + m);
    };

    APPX.appxError = function(e, p) {
      console.log('ERROR: ' + ' ' + e + ' ' + JSON.stringify(p));
    };

    APPX.alogApp = function(m) {
      console.log('APP:' + m);
    };
    APPX.alogAppP = function(m) {
      console.log('APP:' + m);
    };

    APPX.alogApp3 = function(m) {
      // console.log("APP3:"+m);
    };
    APPX.alogApp2 = function(m) {
      //   console.log("APP2:"+m);
    };

    APPX.alogFrame = function(m) {
      //   console.log("APP:"+m);
    };
    APPX.alogAppObj = function(m) {
      //  console.log("APP-Obj:"+m);
    };

    APPX.alogAppCycle = function(m) {
      //console.log("APP-CYC:"+m);
    };
    APPX.alogAppObj2Cycle = function(m) {
      //console.log("APP-CYC:"+m);
    };

    APPX.aloggerApp = function(obj, m) {
      //if (obj!="")
      //  console.log("APP: "+m);
      //if (obj=="event")
      //if (obj=="node-sys")
      //  console.log("APP: ("+obj+") "+m);
    };

    APPX.aloggerEvent = function(m) {
      ///console.log("APP_EVENT: "+m);
    };

    APPX.alogDB = function(m) {
      console.log('DEBUG: ' + m);
    };

    APPX.alogPreload = function(m) {
      console.log('PRELOAD: ' + m);
    };

    APPX.aloggerKit = function(m) {
      //   console.log("KIT: "+m);
    };

    APPX.aloggerKitURL = function(m) {
      //  console.log('URL: ' + m);
    };

    APPX.aloggerKitP = function(m) {
      //  console.log("PHYS: "+m);
    };

    APPX.aloggerKitS = function(m) {
      //  console.log("SYS: "+m);
    };
    APPX.aloggerKitV = function(m) {
      // console.log('VID: ' + m);
    };

    APPX.aloggerCtlKit = function(m) {
      //console.log("CTL: "+m);
    };

    APPX.aloggerCtlKit2 = function(m) {
      //  console.log("CTL: "+m);
    };

    APPX.aloggerKitPW = function(m) {
      //console.log("PHYW: "+m);
    };
  }
}
