import { Component, OnInit, NgZone } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AppXService } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  presentation: any;
  presentations: any;
  analytics: any = [];

  constructor(private appXService: AppXService) ///	private appXDataService: AppXDataService,
  //	private ngZone: NgZone
  {}

  ngOnInit() {
	this.isLoading = true;
	this.subscribePresentationAnalytics();
  }

  navigateTo(link) {
    this.appXService.navigate(link);
  }

  isSelectedTab(type) {
    return this.appXService.islocation(type);
  }
  ///////

  subscribePresentationAnalytics() {
	this.appXService.userDataGet('presentation').subscribe(data => {
		this.presentation=data;
		this.updateAnalytics();
	 });

	this.appXService.userDataGet('presentations').subscribe(data => {
		this.presentations=data;
		this.updateAnalytics();
	 });
  }

  updateAnalytics() {
	if (this.presentation && this.presentations) {
		let pindex = this.appXService.dataPresentationIndexGet(this.presentation)
		let presentation = this.presentations[pindex];
		this.analytics = presentation.analytics;
		console.log(this.analytics)
	}
  }

  analysePresentation() {
	this.appXService.navigate('/splash');
	this.appXService.dataUserProcess(true);
  }

}
