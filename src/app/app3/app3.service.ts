import { Injectable } from '@angular/core';
// import { HttpService } from '@app/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

// import AKIT_AppDevices from './js/akit/app/akit-AppDevices.js';

import { Router } from '@angular/router';

import AKIT_AppThree from './js/akit/app/akit-AppThree';
import APP_run from './js/app3-Run';

import AKIT_AppDevices from './js/akit/app/akit-AppDevices.js';

declare global {
  interface Window {
    APP: any;
    AKIT: any;
  }
}

window.APP = {};
window.AKIT = {};

// import APP_Data from './js/app3-Data';

@Injectable({
  providedIn: 'root'
})
export class App3Service {
  public data = {};
  // private dataObj: BehaviorSubject<{}>;

  private three: any;
  private host: any;
  private objdir: any;
  private running: any;
  private inited: any;

  // https://angular.io/guide/component-interaction
  private triggerUpdateSubject = new Subject<string>();
  triggerUpdate = this.triggerUpdateSubject.asObservable();

  private markerVisibleSubject = new Subject<string>();
  markerVisible = this.markerVisibleSubject.asObservable();

  private triggerUpdateMarkerSubject = new Subject<string>();
  triggerUpdateMarker = this.triggerUpdateMarkerSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // this.host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    this.three = new AKIT_AppThree();
    window.AKIT.devices = new AKIT_AppDevices();
    window.APP.run = new APP_run(); // this.canvas);

    this.host = window.APP.host;
    this.objdir = window.APP.objDir;

    this.init();
    this.route(router);

    // this.service();
  }

  service() {
    this.running = false;
    this.inited = false;

    console.log('app3 service: ' + this.host);
  }

  init() {
    if (!this.inited) {
      this.inited = true;

      this.service();

      window.APP.run.parentSet(this);
      window.APP.run.init();

      console.log('app3 service init');
    }
  }

  start() {
    window.APP.run.start();
  }

  stop() {
    window.APP.run.stop();
  }

  load(id: any) {
    window.APP.run.load(id);
  }

  route(router: any) {
    console.log('app3 service route' + router);
    if (router) {
      window.AKIT.devices.setStartRoute('/ar');
      window.AKIT.devices.initInfoDevices();

      const startRoute = window.AKIT.devices.getStartRoute();
      this.navigate(router, startRoute);
    }
  }

  navigate(router: any, link: any) {
    router.navigate([link], { replaceUrl: true });
  }

  cycleStart() {
    if (!this.running) {
      this.running = true;
      window.APP.run.step();
      //    window.APP.run.animate();
      //   console.log('cycleStart');
    }
  }

  // // this.app3Service.markerVisibleUpdated(true);
  ///////////////////////////////////////////////////////// OBJECTS

  loadObjects(id: any) {
    return window.APP.run.app.objectsLoad(id);
  }

  setObjects(filename: any, directory: any) {
    const url = this.host + directory + filename + '.json';
    const o = this.http.get<any[]>(url);

    o.subscribe(response => {
      // console.log(response);
      window.APP.run.app.objects(response);
    });
  }

  objects(grp: any, code: any) {
    if (this.loadObjects(grp)) {
      // const dir = '/assets/model/' + 'group' + code + '/';
      const dir = this.objdir + 'group' + code + '/';
      this.setObjects('data', dir);
    }
  }

  /////////////////////////////////////// DATA
  triggerUpdated(update: string) {
    this.triggerUpdateSubject.next(update);
  }

  triggerUpdatedMarker(update: string) {
    this.triggerUpdateMarkerSubject.next(update);
  }

  markerVisibleUpdated(update: string) {
    this.markerVisibleSubject.next(update);
  }

  public call(msg: any, d: any) {
    // console.log('call:', msg, d);
    if (this.data[msg] === undefined) {
      this.data[msg] = new BehaviorSubject<Object>({});
    }
    const data = {};
    data[msg] = d;
    this.data[msg].next(data);
  }

  public getData(msg: any): Observable<Object> {
    return this.data[msg].asObservable();
  }

  /////////////////////////////////////// CMDS
  objectIndexSet(i: any) {
    window.APP.run.app.objectIndexSet(i);
  }

  objectIndexGet() {
    return window.APP.run.app.objectIndexGet();
  }

  objectIndexGetFileType() {
    return window.APP.run.app.objectIndexGetFileType();
  }

  objectIndexFade() {
    window.APP.run.app.objectIndexFade();
  }

  parentSet(p: any) {
    const po = window.APP.run.parent;
    if (po != undefined) po.destroy();

    window.APP.run.parentSet(p);
  }

  canvasSet(c: any) {
    window.APP.run.canvasSet(c);
  }

  // start() { window.APP.run.start(); }
  setSceneWindow() {
    window.APP.run.app.setSceneWindow();
  }
  setElement() {
    window.APP.run.app.setElement();
  }
  setCanvas() {
    window.APP.run.app.setCanvas();
  }
  setVideoElement() {
    window.APP.run.app.setVideoElement();
  }

  startedVRCheck() {
    return window.APP.run.app.startedVRCheck();
  }
  loadVR() {
    window.APP.run.app.loadVR();
  }
  startVR(platform: any) {
    window.APP.run.app.startVR(platform);
  }

  stopVR() {
    window.APP.run.app.stopVR();
  }

  // vr.display() {  window.APP.run.app.vr.display(); }

  startedARCheck() {
    return window.APP.run.app.startedARCheck();
  }
  loadAR() {
    window.APP.run.app.loadAR();
  }
  startAR(platform: any) {
    window.APP.run.app.startAR(platform);
  }

  stopAR() {
    window.APP.run.app.stopAR();
  }

  // window.APP.run.animate() { window.APP.run.animate(); }
  // window.APP.run.step() { window.APP.run.step();}
}

/*

 <ion-list>


            <button menuClose ion-item routerLink="/home" routerLinkActive="active">
              <span translate>Home</span>
            </button>
            <button menuClose ion-item routerLink="/arview" routerLinkActive="active">
              <span translate>AR</span>
            </button>
          <button menuClose ion-item routerLink="/vrview" routerLinkActive="active">
            <span translate>VR</span>
          </button>
          <button menuClose ion-item routerLink="/debug" routerLinkActive="active">
            <span translate>Debug</span>
          </button>

        </ion-list>
 */
