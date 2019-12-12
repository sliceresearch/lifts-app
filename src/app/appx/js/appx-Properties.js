export default class APP_Properties {
  constructor() {
    /////////////////////////////////////////// app config
    APP = {
      ///////////////////////////////////////////////////////////basic
      language: 'en', //cn

      ///////////////////////////////////////////////////////////dir

      ////////////////////////////////////////////////// production settings
      protocolProduction: window.location.protocol,
      hostProduction: window.location.hostname,
      portProduction: window.location.port,

      //  objDirProduction: 'data/objects/',
      objDirProduction: 'assets/model/',
      markerDirProduction: 'data/marker/',

      ////////////////////////////////////////////////// development settings
      protocolDevelopment: window.location.protocol,
      hostDevelopment: window.location.hostname,
      portDevelopment: window.location.port,

      objDirDevelopment: 'assets/model/',
      markerDirDevelopment: 'assets/marker/',

      rendererOptions: {
        canvas: APPX.canvas,
        antialias: true,
        alpha: true
        //   precision: 'mediump'
      },

      sceneOptions: {
        worldSize: 10,

        background3D: new THREE.Color('black'),

        grid: true,

        scenevr: ''
      },

      ///////////////////////////////////////////deug
      debug: {
        devices: {}
      },

      ////////////////////////////////////////////////////

      pages: {
        wechat: '/info'
      },

      //////////////////////////////////////media
      video: {
        width: 8,
        height: 8,
        imageWidth: 320,
        imageHeight: 240
      },

      mediaDevices: {
        parameters: {
          ///devices general
          sourceType: 'webcam',
          sourceUrl: null,
          deviceId: null,
          sourceWidth: 480, //480   ///  SETTING FOR resize issue
          sourceHeight: 640, //640,
          displayWidth: 640,
          displayHeight: 480 //640
        },

        parameters2: {
          ///desktop, ios11
          sourceType: 'webcam',
          sourceUrl: null,
          deviceId: null,
          sourceWidth: 640, //480   ///  SETTING FOR resize issue
          sourceHeight: 480, //640,
          displayWidth: 640,
          displayHeight: 480 //640
        }
      }
    };


    APP.properties = {
      /*    video: {
        scale: 0.15,
        rotate: { x: -0.5, y: 0, z: 0 },
        ui: 'rotate',
        extension: 'mp4',
        url: '/',
        location: 'file',
        loader: 'spinner'
        //  control: true
      },*/

      obj: {
        scale: 0.15,
        rotate: { x: 0, y: -0.6, z: 0 },
        ui: 'rotate',
        url: '/',
        location: 'file',
        loader: 'spinner'
      },

      gltf: {
        scale: 0.05,
        rotate: { x: 0, y: 0, z: 0 },
        ui: 'rotate',
        url: '/',
        location: 'file',
        loader: 'spinner'
      }
    };

    ///////////////////////////////////////////////////////

    APP.preload = {
      /*    ARTypePlaneVideoEffectVignette: {
        number: 3,
        args: [APP.video.width, APP.video.height, APP.video.imageWidth, APP.video.imageHeight, '', '', false]
      }*/
    };

    /////////////////////////////////////////////////////////////

    const PRESETS = {
      //////////////////////////debug values
      app: {
        app: {
          system: 'local',
          scene: 'simple' // peppers, vr, standard,simple
        },

        camera: {
          cameraDistanceFar: 10000,
          cameraDistanceNear: 0.1,
          cameraDistanceViewAngle: 45,
          cameraPositionX: 0,
          cameraPositionY: 0,
          cameraPositionZ: 0,
          cameraTargetX: 0,
          cameraTargetY: 0,
          cameraTargetZ: 0
        }
      }
    };

    //////////////////////////////////////////////////////////////////////APP

    APPX.loaded = false;
    APP.directory = 0;
    APP.renderer = 0;
    APP.displayStats = false;

    APP.currentPreset = PRESETS['app']; /// test scene (smaller values)

    //////////////////////////////////////////////////////camera
    APP.sceneType = APP.currentPreset.app.scene;

    APP.cameraDistanceFar = APP.currentPreset.camera.cameraDistanceFar;
    APP.cameraDistanceNear = APP.currentPreset.camera.cameraDistanceNear;
    APP.cameraDistanceViewAngle = APP.currentPreset.camera.cameraDistanceViewAngle;
    APP.cameraPositionX = APP.currentPreset.camera.cameraPositionX;
    APP.cameraPositionY = APP.currentPreset.camera.cameraPositionY;
    APP.cameraPositionZ = APP.currentPreset.camera.cameraPositionZ;

    APP.cameraName = 'camera1';

    APP.hostname = window.document.hostname;
  }
}
