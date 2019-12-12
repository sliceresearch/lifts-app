import { Injectable } from '@angular/core';
import { HttpService } from '@app/core';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class App3DataService {
  http: HttpService;

  constructor() {}

  get(): Promise<any[]> {
    return this.http.get<any[]>('http://localhost:4200/assets/data/data.json').toPromise();
  }
}
