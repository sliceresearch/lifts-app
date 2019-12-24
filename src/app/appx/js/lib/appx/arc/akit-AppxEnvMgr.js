export default class AKIT_XRAppEnvMgr {
  constructor(parent) {
    this.parent = parent;

    this.objects = {};
    this.timer = [];

    //  this.envActive = -1;
    this.focusObjectActive = -1;
    //  this.envConfidence = 0;
    this.timeoutObject = 100;

    this.groupId = '1'; ///init
    this.groupCode = '1';

    this.focusObject = {};
    this.focusObjectId = -1;

    this.event = { place: false };

    // console.log('env mgr');
  }

  setEnvEvent(event, eventid, opts) {
    if (event == 'place') {
      this.setEnvEventPlace(opts.point);
    }
  }

  setEnvEventPlace(point) {
    if (!this.event.place) {
      this.event.place = true;
      this.envAddFocusObject(this.groupId, this.groupCode, 1.0, {
        point: point
      });
    }
  }

  envCycle() {
    if (this.focusObject.id != undefined) {
      this.envUpdFocusObject();
      //  let t = Date.now() - this.timer[this.envActive];
      //    if (t > this.timeoutObject) {
      //  this.clearObject(this.envActive);
      //    this.envActive = -1;
      //  this.envConfidence = 0;
      //  this.setenvInActive();

      //}
    }
  }

  setEnvActive() {
    APP.run.parent.markerVisibleUpdated(true);
  }

  setEnvInActive() {
    APP.run.parent.markerVisibleUpdated(false);
  }

  //////////////////////////////////////////////////////////////////////per scheme

  envAddFocusObject(id, code, conf, opt) {
    this.focusObject = { id: id, code: code, conf: conf, opt: opt };
    console.log('focus obj', this.focusObject);
  }

  envDelFocusObject(id, code, conf, opt) {
    this.focusObject = {};
  }

  envUpdFocusObject() {
    ///test confidence
    let setObj = true;

    if (setObj) {
      if (
        this.setFocusObject(
          this.focusObject.id,
          this.focusObject.code,
          this.focusObject.opt
        )
      ) {
        if (this.focusObjectId != this.focusObject.id)
          this.clearObject(this.focusObject.id, this.focusObject.opt);
        this.focusObjectId = this.focusObject.id;
        //  this.focusObject.conf = conf;
        this.setEnvActive();
        //   this.setObject(this.envActive);
      }
    }

    this.timer[this.focusObject.id] = Date.now();
  }

  setFocusObject(id, code, opt) {
    /////one obj at a time
    let obj = this.getObject(id, code);
    if (obj != false) {
      if (this.focusObjectActive != obj) {
        if (this.focusObjectActive != -1) {
          this.focusObjectActive.activeUnset(opt);
        }
        this.focusObjectActive = obj;
      }

      return obj.activeSet(opt);
    }

    return false;
  }

  clearObject(id, opt) {
    if (id != -1) {
      let obj = this.getObject(id);
      if (obj != undefined) {
        obj.activeUnset(opt);
      }
    }
  }

  getObject(id, code) {
    return this.parent.objectGet(id, code);
  }

  /////////////////////////////////////////////////////////////////////////////////matrix
}
