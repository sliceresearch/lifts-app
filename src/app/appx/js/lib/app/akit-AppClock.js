export default class APPX_AppClock {
  constructor() {
    //APPX_Clock,
    this.timer = {};
    this.state = -1;
  }

  start(name, timeout) {
    this.timer[name] = { time: 0, timeout: timeout };
  }

  stop(name) {
    //this.timer[name]=null;
  }

  set(name, timeout) {
    if (this.timer[name] == undefined) this.start(name, timeout);
    else if (timeout != undefined) this.timer[name].timeout = timeout;

    this.timer[name].time = Date.now() + this.timer[name].timeout;
  }

  time(name) {
    if (Date.now() > this.timer[name].time) {
      this.set(name);
      return true;
    }
    return false;
  }

  timeOut(name) {
    if (Date.now() > this.timer[name].time) {
      //  alogDB("aring: (timeOut) " + name + " " + this.timer[name].time + " " + Date.now() + " " + (Date.now()-this.timer[name].time));
      return true;
    }
    return false;
  }

  stateTime(st, time) {
    if (this.state == -1) {
      this.state = st;
      this.set('state', time);
      return false;
    } else if (this.state != st) {
      this.state = st;
      this.set('state', time);
      return false;
    } else if (this.timeOut('state')) {
      this.state = -1;
      return true;
    }

    return false;
  }

  /////////////////////////////////////////////////////////
  /*
      timerStart:function(name,t) {
        this.timer[name]= {timer:0,value:0,timeout:t}
        this.timer[name].timer =  Date.now() + t;
      }

      timerRun:function(name) {
        var timer = this.timer[name].timer;
        var now=Date.now();
        if (now < timer) {
            var inc=1.0-((timer-now)/this.timer[name].timeout);
            this.timerValueSet(name,inc);
            return false;
        }
        this.timerValueSet(name,1);
        return true;
      }

      timerValueSet:function(name,inc) {
         this.timer[name].value=inc;
      }

      timerValueGet:function(name) {
         return this.timer[name].value;
      }*/
}
