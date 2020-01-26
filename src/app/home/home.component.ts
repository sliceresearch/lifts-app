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
  presentation_data = {};
  presentations: any;
  ratings: any = [];
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
		
		this.ratings = presentation.ratings;
		this.analytics = presentation.analytics;
		this.presentation_data = {name:presentation.name, author:presentation.author,description:presentation.description}
	
	}
  }

  analysePresentation() {
	this.appXService.navigate('/splash');
	this.appXService.dataUserProcess(true);
  }

}


/*	for (var i = 0; i < analytics.length; i++) {
			var analytic = analytics[i];
			if (analytic.type=='presentation_data') {
				this.analytics.push(analytic);
			} else if (analytic.type=='presentation_rating') 
				this.ratings.push(analytic);
		}*/