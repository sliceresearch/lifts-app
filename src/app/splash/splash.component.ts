import { Component, OnInit, NgZone } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AppXService } from '@app/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(private appXService: AppXService) 
  {}

  ngOnInit() {
	this.isLoading = true;
  }

  navigateTo(link) {
    this.appXService.navigate(link);
  }
  
  isSelectedTab(type) {
    return this.appXService.islocation(type);
  }
 
}
