import AKIT_AppEnv from './akit/app/akit-AppEnv.js';
import AKIT_AppLoader from './akit/app/akit-AppLoader.js';
import AKIT_AppKeys from './akit/app/akit-AppKeys.js';
import AKIT_AppObjectStore from './akit/app/akit-AppObjectStore.js';
// import AKIT_AppVideo from './akit/app/akit-AppVideo.js';
// import AKIT_AppPromise from './akit/app/akit-AppPromise';
import { AKIT_ObjectTypePlaneWorldControl3DRay } from './akit/object/type/akit-ObjectTypePlaneWorldControl3DRay';
import { AKIT_ObjectTypeMeshDelaunatorWorldControl3DRay } from './akit/object/type/akit-ObjectTypeMeshDelaunatorWorldControl3DRay';
import { AKIT_ObjectTypeSurfacePointsWorldControl3DRay } from './akit/object/type/akit-ObjectTypeSurfacePointsWorldControl3DRay';

import APP_ToastAR from './app/app-ToastARApp';

export default class APP_run {
  //es6
  constructor() {
    //  console.log('app run construct 0');

    APP.directory = window.location.pathname;
    // AKIT.canvas = canvas;

    AKIT.loader = new AKIT_AppLoader();
    AKIT.loader.add('spinner', { size: 1, len: 1, rotate: { x: -0.5, y: 0, z: 0 } });

    //  AKIT.video = new AKIT_AppVideo();
    AKIT.env = new AKIT_AppEnv();
    //   AKIT.promise = new AKIT_AppPromise();

    this.objectStore = new AKIT_AppObjectStore();
    AKIT.initObjectStore();

    //AKIT.scene = this.scene = new AKIT_Scene();

    this.app = new APP_ToastAR();

    AKIT.running = false;

    this.init();
    //  console.log('app run construct 1');
  }

  init() {
    AKIT.alogKit('(app-init) ');
    this.app.init();
  }

  start() {
    AKIT.alogKit('(app-start) ');
    this.app.start();
    AKIT.running = true;

    //  AKIT.scene.window();
  }

  stop() {
    this.running = false;
    AKIT.alogKit(' (app-stop) ');
  }

  started() {
    AKIT.alogKit('(app-started) ');
    this.control();
    this.animate();
  }

  animate() {
    AKIT.alogKit('(app-animate) ');
    APP.renderer.setAnimationLoop(cycleRender);
    this.unstep();
  }

  scene() {
    // this.control();
  }

  step() {
    AKIT.alogKit('(app-step) ');
    this.stepInt = setInterval(function() {
      cycleStep();
    }, 1000 / 29.97);
  }

  unstep() {
    AKIT.alogKit('(app-unstep) ');
    clearInterval(this.stepInt);
  }

  control() {
    AKIT.alogKit('(app-control) ');
    this.controlPlatform();
    //  this.controlPlane();
    //this.controlMesh();
    // this.controlMeshPlane();
  }

  controlPlatform() {
    AKIT.sceneAR.control();
    AKIT.control = AKIT.sceneAR;
  }

  controlPlane() {
    AKIT.control = new AKIT_ObjectTypePlaneWorldControl3DRay(this.app, 100, 100, 16, 16);
    //AKIT.control = new AKIT_ObjectTypeSphereWorldControl3DRay(this.app, APP.controlRadius, 16, 16);
    AKIT.control.init();
    AKIT.control.resize();

    AKIT.control.object.rotateX(-Math.PI / 2);
  }

  controlMesh() {
    AKIT.control = new AKIT_ObjectTypeMeshDelaunatorWorldControl3DRay(this.app, 10, 10, 8, 8);
    //AKIT.control = new AKIT_ObjectTypeSphereWorldControl3DRay(this.app, APP.controlRadius, 16, 16);
    AKIT.control.init();
    AKIT.control.resize();
  }

  controlMeshPlane() {
    AKIT.control = new AKIT_ObjectTypeSurfacePointsWorldControl3DRay(this.app, 100, 100, 8, 8);
    AKIT.control.init();
    AKIT.control.resize();

    AKIT.control.object.rotateX(-Math.PI / 2);
  }

  canvasSet(p) {
    AKIT.canvas = p;
  }

  parentSet(p) {
    this.parent = p;
  }

  resize() {
    this.app.resize();
  }
}

function cycleRender() {
  if (AKIT.running) {
    APP.run.app.cycle();
    AKIT.control.cycle();
  }
}

function cycleStep() {
  if (AKIT.running) {
    APP.run.app.cycle();
  }
}
