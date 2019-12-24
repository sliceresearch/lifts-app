

import AKIT_AppXGlobal from './akit-AppxGlobal';
import AKIT_AppxEnv from './akit-AppxEnv.js';
//import APPX_AppLoader from './lib/app/akit-AppLoader.js';
//import APPX_AppKeys from './lib/appx/appx-AppKeys.js';
//import APPX_AppObjectStore from './lib/app/akit-AppObjectStore.js';
//import AKIT_XRAppEnvMgr from './akit-XRAppEnvMgr';


export default class AKIT_AppXApp {
	constructor() {

		this.objectFocus = 0;

		this.global = new AKIT_AppXGlobal();

		APPX.env = new AKIT_AppxEnv();
		//this.objectStore = new APPX_AppObjectStore();
		//APPX.initObjectStore();
		// APPX.loader = new APPX_AppLoader();
		//   APPX.loader.add('spinner', { size: 1, len: 1, rotate: { x: -0.5, y: 0, z: 0 } });
		//  APPX.video = new APPX_AppVideo();

	}

	initProperties() {

	}

	initApp() {
		this.render = false;
		this.deviceCheck = false;
		//  this.objectsInit();
	}

	resize() {
		this.setSceneWindow();
	}

	/////////////////////////////////////////////////////////////////////////////////////SET
	setSource() {
		if (APP.sourceAR == undefined) {
			APP.sourceAR = document.getElementById('appscene');
		}
	}

	setElement() {
		let sceneApp = document.getElementById('appscene');
		//  sceneApp.appendChild(APP.sourceAR);
		// console.log('element', sceneApp, APP.sourceAR);
	}

	// removeElement() {
	//  let sceneApp = document.getElementById('appscene');
	//   sceneApp.removeChild(APP.sourceAR);
	//}

	setCanvas() {
		// let sceneApp = document.getElementById('appscene');
		// sceneApp.appendChild(AKIT.canvas);
		// APP.sourceAR.appendChild(AKIT.canvas);
		// console.log('canvas', sceneApp, sceneApp.offsetHeight);
	}

	setSceneWindow() {
		AKIT.windowHeight = window.innerHeight;
		AKIT.windowWidth = window.innerWidth;
		console.log('resize window', AKIT.windowHeight, AKIT.windowWidth);
	}

	unsetCanvas() {
		let sceneApp = document.getElementById('appscene');
		sceneApp.removeChild(AKIT.canvas);
	}

	// removeCanvas() {
	//   let sceneApp = document.getElementById('appscene');
	//   sceneApp.removeChild(AKIT.canvas);
	//  }

/*	setVideoElement() {
		if (AKIT.bgtexture == null) {
			let e = this.getVideo();
			AKIT.bgtexture = new THREE.VideoTexture(e);
			AKIT.bgtexture.minFilter = THREE.LinearFilter;
			AKIT.bgtexture.magFilter = THREE.LinearFilter;
			AKIT.bgtexture.format = THREE.RGBFormat;
		}

		AKIT.scene.scene.background = AKIT.bgtexture;
		//  console.log('vid backgrd',AKIT.scene.scene);
	}

	unsetVideoElement() {
		AKIT.scene.scene.background = new THREE.Color(0xffffff);
	}*/

	addIFrame() {
		let sceneApp = document.getElementById('appscene');
		var scene = document.createElement('iframe');
		scene.setAttribute('src', 'assets/lib/arjs/arjs-frame.html');
		console.log(scene);
		sceneApp.appendChild(scene);
	}

	/////////////////////////////////////////////////////////////////////////////////////GET
	getVideo() {
		return AKIT.sceneAR.scene.source.properties.arsource.domElement;
	}

	/////////////////////////////////////////////////////////////////////////////////////VR PLATFORM

	startAppX(platform) {
		this.startAppXPlatform(platform);
	}

	startedVRCheck() {
		return this.startedVR;
	}

	startAppXApp() {
		// if (this.vr == undefined) this.vr = new AKIT_ARAppVR(this);
	}

	startAppXPlatform(startAppXPlatform) {
		this.startedVR = true;
		this.startAppXApp();
		this.vr.startAppXPlatform(startAppXPlatform);
	}

	loadVR() {
		this.startAppXApp();
		this.vr.load();
	}

	stopVR() {
		this.vr.stop();
	}



	cycleAppx() {
		if (this.render) {

		} else {
			if (!this.deviceCheck) {
				if (AKIT.devices.checkDeviceReady()) {
					this.deviceCheck = true;
				}
			}
			if (this.checkedARApp()) this.render = true;
		}
	}

	env() {
		this.envMgr = new AKIT_XRAppEnvMgr(this);
	}


	/*
	/////////////////////////////////////////////////////////////////////////////////////OBJECTS
	objectsLoad(id) {
	  return this.objectsAR.objectsLoad(id);
	}
  
	objectsInit() {
	  this.objectsAR = new AKIT_ARAppObjects(this);
	  this.objectsAR.init();
	}
  
	objectAnchor(obj) {
	  this.objectsAR.loadAnchor(obj);
	}
  
	object(obj) {
	  this.objectsAR.loadObj(obj);
	}
  
	objects(objectList) {
	  this.objectsAR.load(objectList);
	}
  
	objectGet(markerId, markerCode) {
	  return this.objectsAR.objectGet(markerId, markerCode);
	}
  
	objectData(olist) {
	  let data = {};
	  return data;
	}
  
	objectIndexSet(index) {
	  this.objectsAR.objectIndexSet(index);
	}
  
	objectIndexGet(index) {
	  return this.objectsAR.objectIndexGet(index);
	}
	objectIndexFade() {
	  this.objectsAR.objectIndexFade();
	}
  
	objectGroupDataSet() {
	  this.objectsAR.objectGroupDataSet();
	}
  
	//////////////////////////////////////////focus object
  
	setFocusAction(mediaAction, mediaObj) {
	  if (mediaAction == 'autoplay') {
		if (mediaObj.properties['video'] != undefined) {
		  this.objectFocus = mediaObj.properties.video;
		  this.objectFocusAction = 'autoplay';
		}
	  }
  
	  //  console.log(mediaAction,this.objectFocus);
	}
  
	clearFocusAction() {
	  this.objectFocus = 0;
	  this.objectFocusAction = '';
	  // console.log('clear')
	}
  
	eventGlobalTouchEnd() {
	  //console.log('event',this.objectFocus,this.objectFocusAction)
  
	  if (this.objectFocus != 0) {
		if (this.objectFocusAction == 'autoplay')
		  if (this.objectFocus.properties.video != undefined)
			this.objectFocus.properties.video.play();
	  }
	}*/
}
