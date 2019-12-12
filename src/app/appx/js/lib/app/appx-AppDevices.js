// import ClientJS from 'clientjs'

export default class APPX_AppDevices {
  constructor() {
    this.video = '';
    this.info = { device: '', os: '', browser: '', mediaDevices: 'ok' };
    this.mediaSrc = 0;
    this.deviceList = [];
    this.deviceSelected = false;
    this.startRoute = '/home';
  }

  deviceMsg(text, msg, al) {
    var msg1 = 'DEVICE:' + text + JSON.stringify(msg);
    console.log(msg1);
    if (al) alert(msg1);
  }

  deviceAlert(msg) {
    alert(msg);
  }

  deviceAction(action, msg) {
    if (action == 'redirect') {
      var mylink = APP.pages[msg];
      this.startRoute = mylink;
    } else if (action == 'params2') {
    }
  }

  setStartRoute(s) {
    this.startRoute = s;
  }
  getStartRoute() {
    return this.startRoute;
  }

  initInfoDevices() {
    this.infoDevice();
    this.infoDeviceMedia();

    if (APP.platformAR == 'arjs') {
      return this.infoDeviceActionsSet1();
    } else {
      return this.infoDeviceActionsSet2();
    }

    return false;
  }

  infoDeviceActionsSet1() {
    if (this.infoDeviceActions()) {
      this.infoDeviceParams();
      return true;
    }

    return false;
  }

  infoDeviceActionsSet2() {
    return true;
  }

  initMediaDevices(callback) {
    if (this.checkDeviceMedia()) {
      this.setDeviceMediaConstraints(callback, APP.mediaDevices.parameters);
      // if (this.mediaSrc!=-1)
      return true;
    }
  }

  checkDeviceReady() {
    if (this.mediaSrc == 0) return false;

    if (this.mediaSrc != -1) return true;

    //  this.deviceMsg('no device stream found:' + this.mediaSrc)

    return false;
  }

  infoDevice() {
    var client = new ClientJS(); // Create A New Client Object

    this.info.browser = client.getBrowser(); // Get Browser

    this.info.browserVersion = client.getBrowserMajorVersion(); // Get Browser

    this.info.engine = client.getEngine(); // Get Engine

    this.info.browsercn = this.checkChineseBrowser();

    this.info.osVersion = parseInt(client.getOSVersion());

    if (client.isMobile()) {
      // Check For Mobile Device

      this.info.device = 'mobile';

      if (client.isMobileAndroid()) {
        // Check For Android

        this.info.os = 'android';
      } else if (client.isMobileIOS()) {
        // Check For iOS

        this.info.os = 'ios';

        var isSafari = client.isSafari();

        if (isSafari) {
          this.info.browser = 'safari';
        }
      } else {
        this.info.os = 'other';
      }
    } else {
      this.info.device = 'desktop';

      if (client.isMobileIOS()) {
        this.info.os = 'ipad';
      }
    }

    // this.infoDeviceMedia()

    var infos = APP.platformAR + ' ' + JSON.stringify(this.info);

    this.deviceMsg('user info:' + infos, false);
  }

  infoDeviceActions() {
    // this.deviceAction('redirect','wechat');
    // return false;

    ///////////////////////////////////////////////////////////////SAFARI

    if (this.info.os == 'ios') {
      if (this.info.browser != 'safari') {
        if (this.info.browsercn == 'Wechat') {
          this.deviceAction('redirect', 'wechat');
          // this.deviceAlert('This browser is not supported, please use "open in browser" in Wechat menu')
          //  this.deviceActionOpenBrowser();
          return false;
        } else {
          if (this.info.mediaDevices != 'ok') {
            var errInfo =
              'This browser is not supported, please open in Safari. ' +
              this.info.mediaDevices;
            this.deviceAlert(errInfo);
          } else {
            var errInfo =
              'This browser is not supported, please open in Safari. ';
            this.deviceAlert(errInfo);
          }

          return false;
        }
      }

      if (this.info.osVersion < 12) {
        var errInfo =
          'You may encounter issues with this version of IOS, please upgrade your IOS version for best experience. Click to continue. ' +
          this.info.osVersion;
        this.deviceAlert(errInfo);
      }

      ///////////////////////////////////////////////////////////////ANDROID
    } else {
      if (this.info.browsercn == 'Wechat') {
        this.deviceAction('redirect', 'wechat');

        // this.deviceAlert('This browser is not supported, please use "open in browser" in Wechat menu')
        return false;
      }

      if (this.info.mediaDevices != 'ok') {
        var errInfo =
          'This browser is not supported, please open in Chrome, Firefox or other browser that supports WebRTC. ' +
          this.info.mediaDevices;
        this.deviceAlert(errInfo);

        return false;
      }
    }

    return true;
  }

  deviceActionOpenBrowser() {
    window.open(APP.host);
  }

  infoDeviceMedia() {
    // check API is available
    if (
      navigator.mediaDevices === undefined ||
      navigator.mediaDevices.enumerateDevices === undefined ||
      navigator.mediaDevices.getUserMedia === undefined
    ) {
      if (navigator.mediaDevices === undefined)
        var fctName = 'navigator.mediaDevices';
      else if (navigator.mediaDevices.enumerateDevices === undefined)
        var fctName = 'navigator.mediaDevices.enumerateDevices';
      else if (navigator.mediaDevices.getUserMedia === undefined)
        var fctName = 'navigator.mediaDevices.getUserMedia';

      this.info.mediaDevices = 'WebRTC error:' + fctName + ' not available';
    }
  }

  infoDeviceParams() {
    let params = '1';

    if (this.info.device == 'desktop') {
      APP.mediaDevices.parameters = APP.mediaDevices.parameters2;
      params = '2';
    }

    if (this.info.os == 'ios') {
      if (this.info.osVersion < 12) {
        APP.mediaDevices.parameters = APP.mediaDevices.parameters2;
        params = '2';
      }
    }

    this.deviceMsg('device params:' + params, '', false);
  }

  ///////////////////////////////////////////////////////////////////////////////
  checkDeviceMedia() {
    // check API is available
    if (
      navigator.mediaDevices === undefined ||
      navigator.mediaDevices.enumerateDevices === undefined ||
      navigator.mediaDevices.getUserMedia === undefined
    ) {
      if (navigator.mediaDevices === undefined)
        var fctName = 'navigator.mediaDevices';
      else if (navigator.mediaDevices.enumerateDevices === undefined)
        var fctName = 'navigator.mediaDevices.enumerateDevices';
      else if (navigator.mediaDevices.getUserMedia === undefined)
        var fctName = 'navigator.mediaDevices.getUserMedia';

      this.onError('WebRTC error:' + fctName + ' not available');
      return false;
    }

    return true;
  }

  setDeviceMediaConstraints(callback, parameters) {
    var userMediaConstraints = {
      audio: false,
      video: {
        facingMode: 'environment',
        width: {
          ideal: parameters.sourceWidth
        },
        height: {
          ideal: parameters.sourceHeight
        }
      }
    };

    this.setDeviceConstraints(callback, parameters, userMediaConstraints);
  }

  setDeviceMediaConstraintsId(callback, parameters, id) {
    var userMediaConstraints = {
      audio: false,
      video: {},
      deviceId: id
    };

    this.setDeviceConstraints(callback, parameters, userMediaConstraints);
  }

  setDeviceConstraints(callback, parameters, userMediaConstraints) {
    var _this = this;

    navigator.mediaDevices.enumerateDevices().then(function(devices) {
      _this.deviceDebug(_this, devices);

      if (null !== parameters.deviceId) {
        userMediaConstraints.video.deviceId = {
          exact: parameters.deviceId
        };
      }

      navigator.mediaDevices
        .getUserMedia(userMediaConstraints)
        .then(function success(stream) {
          _this.deviceMsg('stream:', stream, false);
          _this.setDeviceStream(stream);
          _this.deviceSuccess(callback);
          //  _this.deviceListCheck();
          //   _this.deviceMsg('set device stream:', stream)
        })
        .then(() => _this.deviceListCheck());
    });
    /*
          .catch(function(error) {
            _this.setDeviceStream(-1);
        //    _this.onError({
        //      name: error.name,
        //      message: error.message
        //    });
          });
      })
      .catch(function(error) {
        _this.setDeviceStream(-1);
    //    _this.onError({
    //      message: error.message
      //  });
    });*/
  }

  setDeviceStream(s) {
    this.mediaSrc = s;
  }

  deviceDebug(parent, devices) {
    // this.deviceMsg('device no:', devices.length)

    parent.deviceList = [];

    for (var i = devices.length - 1; i >= 0; i--) {
      if (devices[i].kind === 'videoinput') {
        var vd = devices[i];
        var did = devices[i].deviceId;
        this.deviceMsg('device' + i + ':', vd, false);
        parent.deviceList.push(did);
      }
    }
  }

  deviceSuccess(callback) {
    this.deviceSelected = true;
    callback.callbackDevices();
  }

  deviceListCheck() {
    //    console.log(this.deviceList, this.deviceSelected);
    this.deviceMsg(
      'device ids',
      this.deviceList + ' ' + this.deviceSelected,
      false
    );

    if (!this.deviceSelected) {
      var did = this.deviceList[0];
      this.deviceSelected = true;
      this.setDeviceMediaConstraintsId(APP.mediaDevices.parameters, did);
    }
  }

  onError(msg) {
    //   var msg1 = JSON.stringify(msg);

    var errHandling = false;
    var name = msg['name'];
    if (name != undefined) {
      if (this.errorHandling(name)) errHandling = true;
    }

    if (!errHandling) this.deviceMsg('device error:', msg, true);
    //   alert(msg1);
  }

  errorHandling(etype) {
    if (etype == 'NotAllowedError') {
      if (this.info.os == 'ios') {
        if (this.info.browser == 'safari') {
          this.deviceAlert(
            'Please turn on "Camera & Microphone Access" in Settings > Safari and reload app.'
          );
          return true;
        }
      }
    }

    return false;
  }

  checkChineseBrowser() {
    var browserName = 'Other';
    var ua = window.navigator.userAgent;
    var browserRegExp = {
      Sogou: /SE\s2\.X|SogouMobileBrowser/,
      Explorer2345: /2345Explorer|2345chrome|Mb2345Browser/,
      Liebao: /LBBROWSER/,
      Wechat: /MicroMessenger/,
      QQBrowser: /QQBrowser/,
      Baidu: /BIDUBrowser|baidubrowser|BaiduHD/,
      UC: /UBrowser|UCBrowser|UCWEB/,
      MiuiBrowser: /MiuiBrowser/,
      MobileQQ: /Mobile\/\w{5,}\sQQ\/(\d+[\.\d]+)/,
      Shoujibaidu: /baiduboxapp/,
      SamsungBrowser: /samsungbrowser/,
      Firefox: /Firefox/,
      Maxthon: /Maxthon/,
      Se360: /360SE/,
      Ee360: /360EE/,
      TheWorld: /TheWorld/,
      Weibo: /__weibo__/,
      NokiaBrowser: /NokiaBrowser/,
      Opera: /Opera|OPR\/(\d+[\.\d]+)/,
      Edge: /Edge/,
      QQLive: /QQLive(HD)?Browser/,
      Letv: /LetvClient/,
      Youku: /Youku/,
      AndroidBrowser: /Android.*Mobile\sSafari|Android\/(\d[\.\d]+)\sRelease\/(\d[\.\d]+)\sBrowser\/AppleWebKit(\d[\.\d]+)/i,
      IE: /Trident|MSIE/,
      toutiao: /NewsArticle/,
      Chrome: /Chrome|CriOS/,
      Safari: /Version[|\/]([\w.]+)(\s\w.+)?\s?Safari|like\sGecko\)\sMobile\/\w{3,}$/
    };
    for (var i in browserRegExp) {
      if (browserRegExp[i].exec(ua)) {
        browserName = i;
        break;
      }
    }

    return browserName;
  }

  ///////////////////////////////////////////

  setDevice(parent, parameters, domElement) {
    var _this = this;
    // get available devices
    navigator.mediaDevices
      .enumerateDevices()
      .then(function(devices) {
        var userMediaConstraints = {
          audio: false,
          video: {
            facingMode: 'environment',
            width: {
              ideal: parameters.sourceWidth
              // min: 1024,
              // max: 1920
            },
            height: {
              ideal: parameters.sourceHeight
              // min: 776,
              // max: 1080
            }
          }
        };

        if (null !== parameters.deviceId) {
          userMediaConstraints.video.deviceId = {
            exact: parameters.deviceId
          };
        }

        // get a device which satisfy the constraints
        navigator.mediaDevices
          .getUserMedia(userMediaConstraints)
          .then(function success(stream) {
            // set the .src of the domElement
            domElement.srcObject = stream;
            // to start the video, when it is possible to start it only on userevent. like in android
            document.body.addEventListener('click', function() {
              domElement.play();
            });
            // domElement.play();

            // TODO listen to loadedmetadata instead
            // wait until the video stream is ready
            var interval = setInterval(function() {
              if (!domElement.videoWidth) return;
              parent.onReady();
              clearInterval(interval);
            }, 1000 / 50);
          })
          .catch(function(error) {
            _this.onError({
              name: error.name,
              message: error.message
            });
          });
      })
      .catch(function(error) {
        _this.onError({
          message: error.message
        });
      });

    return domElement;
  }

  deviceDebug1() {
    var _this = this;

    if (APP.debug != null) {
      /// APP.debug['devices'] = {};
      APP.debug.devices['video'] = {};

      navigator.mediaDevices
        .enumerateDevices()
        .then(function(devices) {
          let videolist = '';
          let videodev = [];
          //  var backVideoInputId = false
          for (var i = devices.length - 1; i >= 0; i--) {
            if (devices[i].kind === 'videoinput') {
              //  backVideoInputId = devices[i].deviceId;
              //  console.log(devices[i]);
              var vd = devices[i].label;
              //  console.log(vd)
              videolist = videolist + i + ':' + vd + ';';
              videodev.push(devices[i]);

              //  _this.addDebug(videolist,devices[i]);
            }
          }

          ////   APP.debug.devices = videodev;
          // _this.video = videolist;
        })
        .catch(function(error) {
          _this.onError({
            message: error.message
          });
        });
    }

    // let dinfo = APP.debug.devices['video'];

    /*  var devices = APP.debug.devices
      console.log(devices)
      for (var i = devices.length - 1; i >= 0; i--) {
        console.log(devices[i])
      }*/

    //  APPX.alogKit('(debug-info-devices) ' + this.video);

    console.log(APP.debug.devices);
  }

  addDebug(videolist, device) {
    console.log(videolist);
    console.log(device);
  }
}
