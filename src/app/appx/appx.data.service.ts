import { Injectable } from '@angular/core';
import { HttpService } from '@app/core';


import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AppXDataService {
  http: HttpService;

  baseUri:string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor() {}

  get(): Promise<any[]> {
    return this.http.get<any[]>('http://localhost:4200/assets/data/data.json').toPromise();
  }


  
/////////////////////////////////////////////////////////objects
 createData(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  getDatas() {
    return this.http.get(`${this.baseUri}`);
  }

  getData(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateData(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  deleteData(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
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
