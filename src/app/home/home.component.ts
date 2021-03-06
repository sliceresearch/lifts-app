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
  presentation_data = { name: '', title: '', author: '', modified: '' };
  presentations: any;
  ratings: any = [];
  analytics: any = [];
  analytics_slides: any = [];

  constructor(
    private appXService: AppXService ///	private appXDataService: AppXDataService, //	private ngZone: NgZone
  ) {}

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
      let pindex = this.appXService.dataPresentationIndexGet(this.presentation);
      let presentation = this.presentations[pindex];

      if (presentation) {
        //   console.log(presentation);
        this.ratings = presentation.ratings;
        this.analytics = presentation.analytics;

        this.analytics_slides = this.updateAnalyticsSlides(presentation.slides);

        //	console.log(presentation, this.presentation_data);

        this.presentation_data = {
          name: presentation.name,
          author: presentation.last_modified_by,
          title: presentation.title,
          modified: presentation.modified
        };
      }
    }
  }

  updateAnalyticsSlides(slides) {
    let analytics = [];

    if (slides) {
      for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        var slide_analytics = slide.analytics;
        for (var h = 0; h < slide_analytics.length; h++) {
          var analytics_slide = slide_analytics[h];
          analytics.push({
            slide: slide.index,
            description: analytics_slide.description,
            group: analytics_slide.group
          });
        }
      }
    }

    return analytics;
  }

  analysePresentation() {
    this.appXService.navigate('/splash');
    this.appXService.dataUserProcess(true);
  }

  onRate($event: { oldValue: number; newValue: number; starRating: StarRatingComponent }) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  slideNavigate(slide: any) {
    this.appXService.data_index = slide - 1;
    this.appXService.navigate('/analytics');
  }

  fabSelect() {
    this.appXService.navigate('/import');
  }
}

/*

  <!-- fab placed to the (vertical) center and end -->
  <ion-fab vertical="top" horizontal="end" slot="fixed">
    <ion-fab-button>
      <ion-icon name="refresh"></ion-icon>
    </ion-fab-button>
  </ion-fab>



  <!-- fab placed to the (vertical) center and end -->
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button>
      <ion-icon name="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>


  */

/*
<ion-row class="ion-justify-content-center" >
			<ion-item-divider>
			</ion-item-divider>
			<ion-label color="primary"><br><h2 ion-text style="color: #3880ff; text-align: center;">Ratings</h2></ion-label>
 		</ion-row>
		 <br>


		<ion-row class="ion-justify-content-center" >
			<ion-label color="primary"><br><h2 ion-text style="color: #3880ff; text-align: center;">Analytics</h2><br></ion-label>
 		</ion-row>

		 <ion-row class="ion-justify-content-center" >
			<ion-item-divider>
			</ion-item-divider>
			<ion-label color="primary"><br><h2 ion-text style="color: #3880ff; text-align: center;">Issues</h2></ion-label>
 		 </ion-row>





		 */

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
