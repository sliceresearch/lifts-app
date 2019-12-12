///// APPX - application toolkit (assimilate interactive three.js toolkit)

//////////////////////////store
import APPX_ObjectStore from '../object/appx-ObjectStore.js';

export default class APPX_AppObjectStore {
  constructor() {
    APPX.initObjectStore = function() {
      APPX.store = new APPX_ObjectStore();
      APPX.store.preloader.preload();
    };

    Array.prototype.storeIndex = function(from) {
      const obj = this[from];
      obj.store();
      const rest = this.slice(from + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };
  }

  /*
  getCloth() {

    if (this.child.cloth == undefined) {
      let cobj = APPX.store.restoreObject('clothDynamic');
      if (cobj == undefined) {
        this.cloth();
        this.child.cloth.status = 0;
      } else {
        this.child.cloth = cobj;
        this.retrieve();
      }
      console.log('clothget ' + this.id)
    }
  }

  putCloth() {
    if (this.child.cloth != undefined) {
      this.store();
      APPX.store.storeObject('clothDynamic', this.child.cloth);
      this.child.cloth = undefined;
      console.log('clothput ' + this.id)
    }
  }*/
}
