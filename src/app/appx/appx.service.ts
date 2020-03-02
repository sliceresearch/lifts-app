import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '@env/environment';

import APP_run from './js/appx-Run';

declare global {
  interface Window {
    APP: any;
    APPX: any;
  }
}

window.APP = {};
window.APPX = {};

@Injectable({
  providedIn: 'root'
})
export class AppXService {
  public data: any = { user: '' };
  public user: BehaviorSubject<{}> = new BehaviorSubject<Object>({});
  private userProperties = [];

  private host: any;
  private objdir: any;
  private running: any;
  private inited: any;

  baseUri: string = 'http://localhost:8080/api'; //'http://lifts.apps.dj/api'; //'http://localhost:8080/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  userRoute: any = {};

  private routeLocation: string;
  private routeStart: string;

  constructor(
    private http: HttpClient,
    private router: Router //private appXDataService: AppXDataService
  ) {
    // this.host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
    //	window.APPX.devices = new APPX_AppDevices();
    window.APP.run = new APP_run(); // this.canvas);

    this.host = window.APP.host;
    this.objdir = window.APP.objDir;

    this.env();

    this.routeStart = '/splash';
    this.routeLocation = '/splash';

    this.init();
    //	console.log('appx service: ' + this);
  }

  env() {
    if (environment.production) {
      this.baseUri = 'http://lifts.apps.dj/api';
    }

    console.log('appx host:', this.baseUri);
  }

  init() {
    if (!this.inited) {
      this.inited = true;

      console.log('appx service init');

      this.running = false;

      window.APP.run.parentSet(this);
      window.APP.run.init();

      this.initUserRoute();
      this.initData();
      this.initUserData();
    }
  }

  initData() {
    var name = 'lifts17';
    this.dataUserInit(name);
  }

  initUserData() {
    this.userDataInit('presentation', '');
    this.userDataInit('presentations', []);
    this.userDataInit('slides', []);
  }

  initUserRoute() {
    console.log('appx route start:' + this.routeStart);
    this.userDataNavigationRegister('/splash', 'userpresentation', '/home', '/import');
    this.navigate(this.routeStart);
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

  navigate(link: any) {
    console.log('appx navTo:' + link);
    this.routeLocation = link;
    this.router.navigateByUrl(link);
  }

  islocation(link: any) {
    if (this.routeLocation == '/' + link) return true;
    return false;
  }

  cycleStart() {
    if (!this.running) {
      this.running = true;
      window.APP.run.step();
    }
  }

  //////////////////////////////////////////////////////////////////////////data commands

  dataUserInit(name: any) {
    this.data.user = name;
    console.log('appx data (init)', this.data.user);
    this.dataUserGet();
  }

  dataUserGet() {
    let name = this.data.user;
    this.getDataName(name).subscribe(data => {
      this.data = data;
      this.userDataUpdate(data);

      if (!this.data.user) {
        ///////check on init user record
        this.getDataName(name).subscribe(data => {
          this.data = data;
          console.log('appx data (get-init)', this.data.user);
          this.userDataUpdate(data);
          this.userDataNavigation();
        });
      } else {
        console.log('appx data (get)', this.data);
        this.userDataNavigation();
      }
    });
  }

  dataUserUpdate(getok: boolean) {
    let id = this.data._id;
    //console.log("update:", id, this.data)
    this.updateData(id, this.data).subscribe(
      res => {
        console.log('appx data (update)', id);
        if (getok) this.dataUserGet();
      },
      error => {
        console.log(error);
      }
    );
  }

  dataUserProcess(getok: boolean) {
    let user = this.data.user;

    //	console.log('appx data (process-do)', JSON.stringify(this.data));

    return this.processData(user, this.data).subscribe(
      res => {
        console.log('appx data (process-done)', user);
        if (getok) this.dataUserGet();
      },
      error => {
        console.log(error);
        return false;
      }
    );
  }

  dataUserAll() {
    this.getData().subscribe(data => {
      this.data = data;
      console.log('appx data', this.data);
    });
  }

  ////////////presentation

  dataUserPresentationAdd(pres_name: any, pres_file: any) {
    if (this.data) {
      const pindex = this.dataPresentationIndexGet(pres_name);
      if (pindex == -1) this.dataPresentationCreate(pres_name, pres_file);
      else this.dataPresentationUpdate(pindex, pres_name, pres_file);

      this.dataUserUpdate(true);

      //	console.log(pindex, pres_name, pres_file,JSON.stringify(this.data));
    }
  }

  dataPresentationCreate(pres_name, pres_file) {
    let p = { filename: pres_name, file_url_source: pres_file };
    this.data.presentations.push(p);
  }

  dataPresentationUpdate(i, pres_name, pres_file) {
    let pres = this.data.presentations[i];
    pres.filename = pres_name;
    pres.file_url_source = pres_file;
  }

  dataPresentationIndexSet(i) {
    console.log('pres idx:', i);
  }

  dataPresentationsGet() {
    console.log('appx data presentation (get):', this.data);
    return [];
  }

  dataPresentationIndexGet(filename: String) {
    if (this.data.presentations) {
      for (var i = 0; i < this.data.presentations.length; i++) {
        var pres = this.data.presentations[i];
        if (pres.filename === filename) return i;
      }
    }
    return -1;
  }

  dataUserPresentationCurrentSet(filename) {
    this.data.presentation = filename;
  }

  dataUserPresentationCurrentGet() {
    return this.data.presentation;
  }

  ////////////analytics

  ////////////////////////////////////////////////////user subscriptions

  userDataInit(property: any, data: any) {
    this.user[property] = new BehaviorSubject<Object>(data);
    this.userProperties.push(property);
  }

  userDataUpdate(data: any) {
    for (var i = 0; i < this.userProperties.length; i++) {
      var prop = this.userProperties[i];
      this.user[prop].next(data[prop]);
    }
  }

  userDataGet(msg: any): Observable<Object> {
    return this.user[msg].asObservable();
  }

  userDataNavigationRegister(orig, resolver, nav, link2) {
    var route = { resolve: resolver, go: nav, catch: link2 };
    this.userRoute[orig] = route;
    console.log('appx data nav register:', orig, resolver, nav, link2);
  }

  userDataNavigation() {
    let routeNav = this.userRoute[this.router.url];

    if (routeNav) {
      let navTo = this.userDataNavigationResolve(this.router.url, routeNav);
      routeNav = false;
      if (navTo) {
        this.navigate(navTo);
      }
    }
  }

  userDataNavigationResolve(navLoc, navOpt: any) {
    let navTo;

    if (this.data) {
      switch (navOpt.resolve) {
        case 'userpresentation':
          if (this.data.presentation) navTo = navOpt.go;
          else navTo = navOpt.catch;
          break;

        default:
          break;
      }
    }

    if (navTo) console.log('appx data nav resolve:', navLoc, navOpt.resolve, navTo);

    return navTo;
  }

  /////////////////////////////////////////////////////////data ops
  createData(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  updateData(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(catchError(this.errorMgmt));
  }

  processData(id, data): Observable<any> {
    let url = `${this.baseUri}/process/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(catchError(this.errorMgmt));
  }

  deleteData(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(catchError(this.errorMgmt));
  }

  getData() {
    return this.http.get(`${this.baseUri}`);
  }

  getDataId(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  getDataName(name): Observable<any> {
    let url = `${this.baseUri}/read/${name}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
