import { Injectable } from '@angular/core';
// import { HttpService } from '@app/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

// import APPX_AppDevices from './js/appx/app/appx-AppDevices.js';

import { Router } from '@angular/router';

import APP_run from './js/appx-Run';

import APPX_AppDevices from './js/lib/app/appx-AppDevices.js';

declare global {
  interface Window {
    APP: any;
    APPX: any;
  }
}

window.APP = {};
window.APPX = {};

// import APP_Data from './js/appx-Data';

@Injectable({
  providedIn: 'root'
})
export class AppXService {
  public data = {};
  // private dataObj: BehaviorSubject<{}>;

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

    window.APPX.devices = new APPX_AppDevices();
    window.APP.run = new APP_run(); // this.canvas);

    this.host = window.APP.host;
    this.objdir = window.APP.objDir;

    this.init();
    //this.route(router);

	console.log('appx service: ' + this.host);
    // this.service();
  }

  service() {
    this.running = false;
    this.inited = false;

   // console.log('appx service: ' + this.host);
  }

  init() {
    if (!this.inited) {
      this.inited = true;

      this.service();

      window.APP.run.parentSet(this);
      window.APP.run.init();

      console.log('appx service init');
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
    console.log('appx service route' + router);
    if (router) {
      window.APPX.devices.setStartRoute('/home');
      window.APPX.devices.initInfoDevices();

      const startRoute = window.APPX.devices.getStartRoute();
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

  // // this.appxService.markerVisibleUpdated(true);
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

}

