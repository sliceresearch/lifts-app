import { AfterViewInit, Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AppXService } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLoading: boolean;

  constructor(private router: Router, private app3Service: AppXService) {}

  ngOnInit() {
    this.isLoading = true;
  }

  ngAfterViewInit() {
    //  this.app3Service.init();
    console.log('splash');
    this.app3Service.route(this.router);
  }
}
