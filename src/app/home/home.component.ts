import { Component, OnInit, NgZone } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AppXService } from '@app/core';

import { StarRatingComponent } from 'ng-starrating';

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
	{ }

	onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
		alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
	}

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
			this.presentation = data;
			this.updateAnalytics();
		});

		this.appXService.userDataGet('presentations').subscribe(data => {
			this.presentations = data;
			this.updateAnalytics();
		});
	}

	updateAnalytics() {
		if (this.presentation && this.presentations) {
			let pindex = this.appXService.dataPresentationIndexGet(this.presentation)
			let presentation = this.presentations[pindex];

			if (presentation) {
				this.ratings = presentation.ratings;
				this.analytics = presentation.analytics;
			
				this.presentation_data = { name: presentation.name, author: presentation.author, title: presentation.title }
			}

		}
	}


	analysePresentation() {
		this.appXService.navigate('/splash');
		this.appXService.dataUserProcess(true);
	}

}


/*


			 
				<ion-list *ngFor="let obj of ratings; index as i" >
				
							<ion-item>
								<ion-label color="grey">Slide 1</ion-label> 
								<ion-label color="primary">Too Much Text</ion-label> 
								 
								<ion-label color="grey">Too much text on this slide. Try and reduce the amount of bullet points.</ion-label>
						   </ion-item>
				</ion-list>
		 
 	 	
			
			
			<ion-col *ngFor="let obj of ratings; index as i" size="12">
			
							<ion-card >
								<ion-card-header>
									<ion-card-subtitle><ion-label color="grey">Slide 1</ion-label></ion-card-subtitle>
									<ion-card-title><ion-label color="primary">Too Much Text</ion-label></ion-card-title>
								</ion-card-header>

								<ion-card-content>
									<ion-label color="grey">Too much text on this slide. Try and reduce the amount of bullet points.</ion-label>
								</ion-card-content>
							</ion-card>
					
				
			</ion-col>




  <ion-row *ngFor="let obj of ratings; index as i">
			 
			 <ion-col  size="12">
						<ion-card >
							<ion-card-header>
								<ion-card-title><p ion-text color="primary">{{ obj.description }}</p></ion-card-title>
								<ion-card-subtitle><p ion-text color="primary">{{ obj.description }}</p></ion-card-subtitle>
							</ion-card-header>

							<ion-card-content>
								<star-rating value="{{ obj.value }}" totalstars="5" checkedcolor="#3880ff" uncheckedcolor="grey" size="24px" readonly="true" (rate)="onRate($event)"></star-rating>	
					
							</ion-card-content>
						</ion-card>
			</ion-col>
				 
          </ion-row>


		  */
/*


						 <div  style="color: white; text-align: right;">
							<button ion-item  (click)="analysePresentation()">Analyse</button>
						</div>

      </div>
    </div>
  </div>

  <div ion-fixed class="fixed-content">
    <div class="row row-center">
	  <div class="col col-center">


<ion-row class="ion-justify-content-center">
				<ion-col style="background-color: #primary" col-12>

				 <div id="block" class="cell">

            	</div>
				</ion-col>

		</ion-row>


			<ion-card>
					<ion-card-header>
						<ion-card-subtitle><h6 ion-text style="text-align: left;">{{presentation_data.author}}</h6></ion-card-subtitle>
						<ion-card-title><h1 ion-text style="text-align: left;">{{presentation_data.name}}</h1></ion-card-title>
						<ion-card-title><h5 ion-text color="dark" style="text-align: left;">{{presentation_data.title}}</h5></ion-card-title>

						 <div  style="text-align: right;">
							<button ion-item  (click)="analysePresentation()">Analyse</button>
						</div>

					</ion-card-header>

					<ion-card-content>

						<h4 ion-text col or="dark" style="text-align: left;">20/01/2019</h4>

					</ion-card-content>
					</ion-card>*/


/*	for (var i = 0; i < analytics.length; i++) {
			var analytic = analytics[i];
			if (analytic.type=='presentation_data') {
				this.analytics.push(analytic);
			} else if (analytic.type=='presentation_rating')
				this.ratings.push(analytic);
		}*/