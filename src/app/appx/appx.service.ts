import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

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
	public data: any;
	public user: BehaviorSubject<{}> = new BehaviorSubject<Object>({});
	private userProperties = [];

	private host: any;
	private objdir: any;
	private running: any;
	private inited: any;

	baseUri: string = 'http://localhost:8080/api';
	headers = new HttpHeaders().set('Content-Type', 'application/json');

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

			this.initData();
			this.initUserData();

			console.log('appx service init');
		}
	}

	initData() {
		var name = 'lifts6';
		this.dataUserInit(name);
	}

	initUserData() {
		this.userDataInit('presentations', [])
		//this.userDataInit('test',{})
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
		this.navigate(this.routeStart);
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
		this.getDataName(name).subscribe(data => {
			this.data = data;
			this.userDataUpdate(data)
			console.log('data (init)', this.data);
		});
	}

	dataUserUpdate() {
		let id = this.data._id;
		console.log("update:",id,this.data)
		this.updateData(id, this.data).subscribe(
			res => {
				console.log('data (update)', id, this.data);
			},
			error => {
				console.log(error);
			}
		);
	}

	dataUserProcess() {
		let user = this.data.user;
		console.log("process:",user)
		this.processData(user, this.data).subscribe(
			res => {
				console.log('data (processed)', user, this.data);
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

	dataUserPresentationAdd(pres_name: any, pres_file: any) {
		if (this.data) {
			const pindex = this.dataPresentationIndexGet(pres_name)
			if (pindex == -1)
				this.dataPresentationCreate(pres_name, pres_file);
			else
				this.dataPresentationUpdate(pindex, pres_name, pres_file);

			this.dataUserUpdate();

		}
	}

	dataPresentationCreate(pres_name, pres_file) {
		let p = { name: pres_name, file_url_source: pres_file };
		this.data.presentations.push(p);
	}

	dataPresentationUpdate(i, pres_name, pres_file) {
		let pres = this.data.presentations[i]
		pres.name = pres_name;
		pres.file_url_source = pres_file;
	}

	dataPresentationIndexSet(i) {
		console.log('pres idx:', i);
	}

	dataPresentationsGet() {
		console.log('data presentation (get):', this.data);
		return [];
	}

	dataPresentationIndexGet(name: String) {
		if (this.data.presentations) {
			for (var i = 0; i < this.data.presentations.length; i++) {
				var pres = this.data.presentations[i];
				if (pres.name === name) return i;
			}
		}
		return -1;
	}

	dataUserPresentationCurrentSet(name) {
		this.data.presentationLatest = name;
	}

	dataUserPresentationCurrentGet() {
		return this.data.presentationLatest;
	}

	////////////////////////////////////////////////////subscribe

	userDataInit(property: any, data: any) {
		this.user[property] = new BehaviorSubject<Object>(data);
		this.userProperties.push(property)
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
