import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import APP_run from './js/appx-Run';

//import { AppXDataService } from '@app/core';

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
  public data: any;
  // private dataObj: BehaviorSubject<{}>;

  private host: any;
  private objdir: any;
  private running: any;
  private inited: any;

  baseUri: string = 'http://localhost:8080/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  // https://angular.io/guide/component-interaction
  //	private triggerUpdateSubject = new Subject<string>();
  //	triggerUpdate = this.triggerUpdateSubject.asObservable();

  //	private markerVisibleSubject = new Subject<string>();
  //	markerVisible = this.markerVisibleSubject.asObservable();

  //	private triggerUpdateMarkerSubject = new Subject<string>();
  //	triggerUpdateMarker = this.triggerUpdateMarkerSubject.asObservable();

  private routeLocation: string;
  private routeStart: string;

  constructor(private http: HttpClient, private router: Router) //private appXDataService: AppXDataService
  {
    // this.host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    //	window.APPX.devices = new APPX_AppDevices();
    window.APP.run = new APP_run(); // this.canvas);

    this.host = window.APP.host;
    this.objdir = window.APP.objDir;

    this.init();

    this.routeStart = '/home';
    this.routeLocation = '/home';

    this.route();

    console.log('appx service: ' + this);
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

      this.dataInit();

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

  route() {
    console.log('appx route:' + this.routeStart);

    //window.APPX.devices.setStartRoute('/home');
    //window.APPX.devices.initInfoDevices();

    //const startRoute = this.routeStart;//window.APPX.devices.getStartRoute();
    this.navigate(this.routeStart);
  }

  navigate(link: any) {
    console.log('appx navTo:' + link);
    this.routeLocation = link;
    this.router.navigateByUrl(link);
    // this.router.navigate([link], { replaceUrl: true });
  }

  islocation(link: any) {
    //console.log(this.routeLocation,link)
    if (this.routeLocation == '/' + link) return true;
    return false;
  }

  cycleStart() {
    if (!this.running) {
      this.running = true;
      window.APP.run.step();
      //    window.APP.run.animate();
      //   console.log('cycleStart');
    }
  }

  //////////////////////////////////////////////////////////////////////////datamanage

  dataInit() {
    var name = 'liftsuser';
    this.dataUserInit(name);
    //	this.dataUserAll();
  }

  dataUserInit(name: any) {
    this.getDataName(name).subscribe(data => {
      this.data = data;
      console.log('data (init)', this.data);
    });
  }

  dataUserUpdate() {
    let id = this.data._id;
    this.updateData(id, this.data).subscribe(
      res => {
        console.log('data (update)', id, this.data);
      },
      error => {
        console.log(error);
      }
    );
  }

  dataUserAll() {
    this.getData().subscribe(data => {
      this.data = data;
      console.log('data', this.data);
    });
  }

  dataUserPresentationAdd(pres_name, pres_file) {
    if (this.data) {
      let p = { name: pres_name, file_url_source: pres_file };
      this.data.presentations.push(p);
      console.log('pres added:', p);
      this.dataUserUpdate();
    }
  }

  dataPresentationIndexSet(i) {
    console.log('pres idx:', i);
  }

  dataPresentationsGet() {
    //	console.log(this.data);
    //	if (this.data)
    //		return this.data.presentations;
  }

  //////////////////////////////////http

  /////////////////////////////////////////////////////////objects
  createData(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  getData() {
    return this.http.get(`${this.baseUri}`);
  }

  getDataLatest(): Observable<any> {
    let url = `${this.baseUri}/latest`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
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

  updateData(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(catchError(this.errorMgmt));
  }

  deleteData(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(catchError(this.errorMgmt));
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

//this.readData({name:'ICT221'});

/*
	readData(name) {
		this.appXDataService.getData().subscribe((data) => {
			this.presentations = data;
			console.log('pres', this.presentations);
		})
	}

	importPresentation() {

		this.appXDataService.createData({name:'ICT221',analytics:'none'}).subscribe(
			(res) => {
				console.log('Data successfully created!')
			    this.ngZone.run(() => this.appXService.navigate('/analytics'))
			}, (error) => {
				console.log(error);
			});

	}
*/

///////////////////////////////////////////////////////// OBJECTS

/*	loadObjects(id: any) {
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
	}*/
