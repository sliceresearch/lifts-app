import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { IonSlides } from '@ionic/angular';

import { AppXService } from '@app/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  @ViewChild(IonSlides, { static: false })
  slides: IonSlides;

  quote: string | undefined;
  isLoading = false;

  presentation: any;
  presentation_data = { name: '', title: '', author: '' };
  presentations: any;
  presentation_slides: any = [];

  slide_analytics: any = [];
  slide_title: any = [];
  slide_content: any = [];
  slide_index: any = 0;

  slideOpts = {
    // direction: 'vertical'
    // longSwipesMs:50,
    // resistance:false,
    //  height:500,
    speed: 500,
    resistanceRatio: 0.2
  };

  constructor(private appXService: AppXService) {}

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
        this.presentation_slides = presentation.slides;
        //	this.presentation_analytics = presentation.slides;
        this.presentation_data = { name: presentation.name, author: presentation.author, title: presentation.title };

        this.updateSlide();

        console.log(presentation, this.presentation_data, this.presentation_slides);
      }
    }
  }

  updateSlide() {
    var slide = this.presentation_slides[this.slide_index];

    this.slide_title = slide.title;
    this.slide_content = slide.content;
    this.slide_analytics = slide.analytics;
  }

  analysePresentation() {
    this.appXService.navigate('/splash');
    this.appXService.dataUserProcess(true);
  }

  ////////////////////////////////////////////

  ////////////////////////////////////// slides

  getSelectedIdx(i: any) {
    //	if (i === this.app3Service.objectIndexGet()) {
    //	  return true;
    //	}
    //	return false;
  }

  getSelectedIdxNameIcon(fn: any) {
    //return this.iconNames[fn];
  }

  slideToThis(i: any) {
    this.slides.slideTo(i);
  }

  slideChanged() {
    this.slides.getActiveIndex().then(i => {
      console.log('slide index' + i);
      this.slide_index = i;
      this.updateSlide();
    });
  }

  slideNextStart() {
    console.log('start');
    //this.app3Service.objectIndexFade();
  }

  slideNextEnd() {
    console.log('end');
  }

  slidePrevStart() {
    // console.log("start")
  }

  slidePrevEnd() {
    //  console.log("end")
  }
}
